---
sidebar_position: 2
---

# Integrating Gazebo with ROS 2

This chapter provides a tutorial on connecting the ROS 2 nervous system to the Gazebo simulation.

## Subtasks:

-   Explain the `ros_gz_bridge` for passing messages between ROS 2 and Gazebo.
-   Write a tutorial on controlling the simulated robot's joints using ROS 2 topics.
-   Develop a guide on receiving sensor data from Gazebo into ROS 2 nodes.

## Understanding `ros_gz_bridge`

The `ros_gz_bridge` is a crucial tool for seamless communication between ROS 2 and Gazebo (specifically Gazebo Sim, formerly Ignition Gazebo). It acts as a translator, allowing ROS 2 messages to be published to Gazebo topics and vice versa. This enables your ROS 2 nodes to control simulated robots and receive sensor data from the simulation.

### Why `ros_gz_bridge`?

-   **Interoperability**: Gazebo Sim uses its own set of messages and topics (Ignition Transport), while ROS 2 uses its message types. The bridge handles the conversion between these two ecosystems.
-   **Flexibility**: You can bridge various message types, including `sensor_msgs/Image`, `sensor_msgs/LaserScan`, `geometry_msgs/Twist`, and custom messages.
-   **Modularity**: It allows you to keep your ROS 2 robot control logic separate from the simulation environment details.

### How it Works

The `ros_gz_bridge` operates by subscribing to a topic on one side (e.g., a ROS 2 topic) and publishing to a corresponding topic on the other side (e.g., a Gazebo topic), performing necessary message type conversions in between.

### Basic Usage

You can launch the `ros_gz_bridge` using a ROS 2 launch file or directly from the command line.

#### Command Line Example

To bridge a ROS 2 `geometry_msgs/Twist` topic to a Gazebo `cmd_vel` topic (for controlling a robot's velocity):

```bash
ros2 run ros_gz_bridge bridge /cmd_vel@geometry_msgs/msg/Twist@ignition.msgs.Twist
```
-   `/cmd_vel`: The ROS 2 topic name.
-   `geometry_msgs/msg/Twist`: The ROS 2 message type.
-   `ignition.msgs.Twist`: The corresponding Gazebo (Ignition Transport) message type.

#### Launch File Example

For more complex setups, it's recommended to use a launch file. Here's an example of bridging a camera image:

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='ros_gz_bridge',
            executable='bridge',
            arguments=[
                '/camera/image_raw@sensor_msgs/msg/Image[ignition.msgs.Image',
                '/camera/camera_info@sensor_msgs/msg/CameraInfo[ignition.msgs.CameraInfo',
            ],
            output='screen'
        )
    ])
```
This launch file bridges the ROS 2 `Image` and `CameraInfo` messages to their Gazebo equivalents, allowing your ROS 2 image processing nodes to receive data from a simulated camera in Gazebo.

The `ros_gz_bridge` is a powerful and flexible tool that simplifies the integration of ROS 2 control systems with Gazebo simulations, making it an essential component for developing and testing robotic applications.

## Controlling Simulated Robot Joints using ROS 2 Topics

To control your simulated robot in Gazebo from ROS 2, you'll typically use the `ros_control` framework or directly publish to Gazebo topics that control joint commands. Here, we'll focus on a common approach using the `JointStatePublisher` and `JointTrajectoryController` in conjunction with `ros_gz_bridge`.

### Prerequisites

1.  **URDF with `ros_control` tags**: Your URDF must include `<ros2_control>` tags to define your robot's hardware interface and controllers.
2.  **`ros_gz_bridge` running**: Ensure you have the `ros_gz_bridge` actively bridging the necessary topics for joint commands.

### Steps to Control Joints

1.  **Modify URDF for `ros2_control`**:
    Add the following to your URDF (typically at the end, before `</robot>`):

    ```xml
    <ros2_control name="simple_arm_controller" type="system">
      <hardware>
        <plugin>gazebo_ros2_control/GazeboSystem</plugin>
      </hardware>
      <joint name="joint1">
        <command_interface name="position">
          <param name="min"> -1.57 </param>
          <param name="max"> 1.57 </param>
        </command_interface>
        <state_interface name="position"/>
        <state_interface name="velocity"/>
      </joint>
      <joint name="joint2">
        <command_interface name="position">
          <param name="min"> -1.57 </param>
          <param name="max"> 1.57 </param>
        </command_interface>
        <state_interface name="position"/>
        <state_interface name="velocity"/>
      </joint>
    </ros2_control>
    ```

2.  **Define Controllers (in a YAML file)**:
    Create a YAML file (e.g., `simple_arm_controllers.yaml`) in your package's `config` directory to define the controllers:

    ```yaml
    controller_manager:
      ros__parameters:
        update_rate: 100

    joint_state_broadcaster:
      ros__parameters:
        type: joint_state_broadcaster/JointStateBroadcaster

    joint_trajectory_controller:
      ros__parameters:
        type: joint_trajectory_controller/JointTrajectoryController
        joints:
          - joint1
          - joint2
        command_interfaces:
          - position
        state_interfaces:
          - position
          - velocity
    ```

3.  **Launch `ros2_control` and Controllers**:
    Modify your `spawn_robot.launch.py` (or create a new launch file) to load the `ros2_control` configuration and spawn the controllers:

    ```python
    # ... (previous imports and definitions) ...
    from launch_ros.actions import Node
    from launch.actions import DeclareLaunchArgument
    from launch.substitutions import LaunchConfiguration, Command
    import xacro

    def generate_launch_description():
        # ... (get pkg_path, urdf_file as before) ...

        # Load robot description using xacro if needed
        # robot_description_content = Command(['xacro ', urdf_file])

        # Robot State Publisher Node
        robot_state_publisher_node = Node(
            package='robot_state_publisher',
            executable='robot_state_publisher',
            name='robot_state_publisher',
            output='screen',
            parameters=[{'robot_description': open(urdf_file).read()}], # Or robot_description_content if using xacro
        )

        # Gazebo Launch
        # ... (gazebo launch as before) ...

        # Spawn Entity (robot) in Gazebo
        # ... (spawn_entity as before) ...

        # Load controllers
        controller_params = os.path.join(
            pkg_path, 'config', 'simple_arm_controllers.yaml')

        control_node = Node(
            package='controller_manager',
            executable='ros2_control_node',
            parameters=[controller_params],
            output='screen'
        )

        joint_state_broadcaster_spawner = Node(
            package='controller_manager',
            executable='spawner',
            arguments=['joint_state_broadcaster', '-c', '/controller_manager'],
            output='screen'
        )

        joint_trajectory_controller_spawner = Node(
            package='controller_manager',
            executable='spawner',
            arguments=['joint_trajectory_controller', '-c', '/controller_manager'],
            output='screen'
        )

        return LaunchDescription([
            gazebo,
            robot_state_publisher_node,
            spawn_entity,
            control_node,
            joint_state_broadcaster_spawner,
            joint_trajectory_controller_spawner,
        ])
    ```

4.  **Send Commands to the Controller**:
    Once the `joint_trajectory_controller` is loaded, you can send `trajectory_msgs/JointTrajectory` messages to its `/joint_trajectory_controller/joint_trajectory` topic to command the robot's joints.

    Example ROS 2 command to move `joint1` to an angle of 0.5 radians:
    ```bash
    ros2 topic pub /joint_trajectory_controller/joint_trajectory trajectory_msgs/msg/JointTrajectory '{joint_names: ["joint1"], points: [{positions: [0.5], time_from_start: {sec: 2}}]}'
    ```
    You can also write a ROS 2 node that publishes these messages programmatically.

By following these steps, you can establish a robust control interface for your simulated robot in Gazebo, enabling precise manipulation of its joints through ROS 2 topics.
