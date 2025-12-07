---
sidebar_position: 2
---

# Simulating the Robot in Gazebo

This chapter focuses on developing content for using the Gazebo simulator for our robot.

## Subtasks:

-   Write a guide on importing a URDF model into a Gazebo world.
-   Explain how to add and configure physics properties (e.g., friction, gravity).
-   Document how to add simulated sensors (camera, LiDAR) to the model.

## Importing a URDF Model into a Gazebo World

Gazebo is a powerful 3D robot simulator that works seamlessly with ROS 2. To simulate your robot, you'll first need to get your URDF model into a Gazebo world.

### Prerequisites

1.  **Gazebo Installation**: Ensure you have Gazebo installed. If you're using ROS 2, it typically comes with a Gazebo version (e.g., Gazebo Classic or Gazebo Sim, formerly Ignition Gazebo).
2.  **URDF Model**: You should have a valid URDF file for your robot, as created in the previous chapter.

### Steps to Import

1.  **Create a Gazebo World File (Optional but Recommended)**:
    While you can directly launch a URDF in an empty Gazebo instance, defining a world file (`.world`) allows you to add environments, lights, and other static objects. Create a file (e.g., `my_robot.world`) in your ROS 2 package's `worlds` directory (or similar):

    ```xml
    <?xml version="1.0" ?>
    <sdf version="1.6">
      <world name="default">
        <include>
          <uri>model://sun</uri>
        </include>
        <include>
          <uri>model://ground_plane</uri>
        </include>
        <!-- Your robot will be spawned here -->
      </world>
    </sdf>
    ```

2.  **Create a Launch File to Spawn the Robot**:
    You'll typically use a ROS 2 launch file (Python or XML) to start Gazebo and spawn your robot. This allows for easier integration with other ROS 2 nodes.

    Create a Python launch file (e.g., `spawn_robot.launch.py`) in your package's `launch` directory:

    ```python
    import os
    from ament_index_python.packages import get_package_share_directory
    from launch import LaunchDescription
    from launch.actions import IncludeLaunchDescription
    from launch.launch_description_sources import PythonLaunchDescriptionSource
    from launch_ros.actions import Node

    def generate_launch_description():
        # Get the path to your URDF file
        pkg_path = get_package_share_directory('my_package') # Replace 'my_package' with your package name
        urdf_file = os.path.join(pkg_path, 'urdf', 'simple_arm.urdf') # Replace 'simple_arm.urdf'

        # Gazebo launch
        gazebo = IncludeLaunchDescription(
            PythonLaunchDescriptionSource([os.path.join(
                get_package_share_directory('gazebo_ros'), 'launch', 'gazebo.launch.py')]),
            launch_arguments={'world': os.path.join(pkg_path, 'worlds', 'my_robot.world')}.items(), # Optional: use your custom world
        )

        # Node to publish the robot description to the /robot_description topic
        robot_state_publisher_node = Node(
            package='robot_state_publisher',
            executable='robot_state_publisher',
            name='robot_state_publisher',
            output='screen',
            parameters=[{'robot_description': open(urdf_file).read()}],
        )

        # Node to spawn the robot in Gazebo
        spawn_entity = Node(package='gazebo_ros', executable='spawn_entity.py',
                            arguments=['-topic', 'robot_description',
                                       '-entity', 'simple_arm'],
                            output='screen')

        return LaunchDescription([
            gazebo,
            robot_state_publisher_node,
            spawn_entity,
        ])
    ```
    Make sure your URDF file is located at `my_package/urdf/simple_arm.urdf` and is included in your `setup.py`'s `data_files` for installation.

3.  **Run the Launch File**:
    After building your workspace (`colcon build`) and sourcing it, you can run:

    ```bash
    ros2 launch my_package spawn_robot.launch.py
    ```
---
sidebar_position: 2
---

# Simulating the Robot in Gazebo

This chapter focuses on developing content for using the Gazebo simulator for our robot.

## Subtasks:

-   Write a guide on importing a URDF model into a Gazebo world.
-   Explain how to add and configure physics properties (e.g., friction, gravity).
-   Document how to add simulated sensors (camera, LiDAR) to the model.

## Importing a URDF Model into a Gazebo World

Gazebo is a powerful 3D robot simulator that works seamlessly with ROS 2. To simulate your robot, you'll first need to get your URDF model into a Gazebo world.

### Prerequisites

1.  **Gazebo Installation**: Ensure you have Gazebo installed. If you're using ROS 2, it typically comes with a Gazebo version (e.g., Gazebo Classic or Gazebo Sim, formerly Ignition Gazebo).
2.  **URDF Model**: You should have a valid URDF file for your robot, as created in the previous chapter.

### Steps to Import

1.  **Create a Gazebo World File (Optional but Recommended)**:
    While you can directly launch a URDF in an empty Gazebo instance, defining a world file (`.world`) allows you to add environments, lights, and other static objects. Create a file (e.g., `my_robot.world`) in your ROS 2 package's `worlds` directory (or similar):

    ```xml
    <?xml version="1.0" ?>
    <sdf version="1.6">
      <world name="default">
        <include>
          <uri>model://sun</uri>
        </include>
        <include>
          <uri>model://ground_plane</uri>
        </include>
        <!-- Your robot will be spawned here -->
      </world>
    </sdf>
    ```

2.  **Create a Launch File to Spawn the Robot**:
    You'll typically use a ROS 2 launch file (Python or XML) to start Gazebo and spawn your robot. This allows for easier integration with other ROS 2 nodes.

    Create a Python launch file (e.g., `spawn_robot.launch.py`) in your package's `launch` directory:

    ```python
    import os
    from ament_index_python.packages import get_package_share_directory
    from launch import LaunchDescription
    from launch.actions import IncludeLaunchDescription
    from launch.launch_description_sources import PythonLaunchDescriptionSource
    from launch_ros.actions import Node

    def generate_launch_description():
        # Get the path to your URDF file
        pkg_path = get_package_share_directory('my_package') # Replace 'my_package' with your package name
        urdf_file = os.path.join(pkg_path, 'urdf', 'simple_arm.urdf') # Replace 'simple_arm.urdf'

        # Gazebo launch
        gazebo = IncludeLaunchDescription(
            PythonLaunchDescriptionSource([os.path.join(
                get_package_share_directory('gazebo_ros'), 'launch', 'gazebo.launch.py')]),
            launch_arguments={'world': os.path.join(pkg_path, 'worlds', 'my_robot.world')}.items(), # Optional: use your custom world
        )

        # Node to publish the robot description to the /robot_description topic
        robot_state_publisher_node = Node(
            package='robot_state_publisher',
            executable='robot_state_publisher',
            name='robot_state_publisher',
            output='screen',
            parameters=[{'robot_description': open(urdf_file).read()}],
        )

        # Node to spawn the robot in Gazebo
        spawn_entity = Node(package='gazebo_ros', executable='spawn_entity.py',
                            arguments=['-topic', 'robot_description',
                                       '-entity', 'simple_arm'],
                            output='screen')

        return LaunchDescription([
            gazebo,
            robot_state_publisher_node,
            spawn_entity,
        ])
    ```
    Make sure your URDF file is located at `my_package/urdf/simple_arm.urdf` and is included in your `setup.py`'s `data_files` for installation.

3.  **Run the Launch File**:
    After building your workspace (`colcon build`) and sourcing it, you can run:

    ```bash
    ros2 launch my_package spawn_robot.launch.py
    ```
    This command will start Gazebo (either Gazebo Classic or Gazebo Sim, depending on your setup) and spawn your robot model into the world. You should then see your robot in the Gazebo simulator.

## Configuring Physics Properties in Gazebo

Gazebo's physics engine simulates the real-world behavior of robots and objects. You can configure various physics properties to achieve realistic or desired simulation outcomes. These properties are typically defined within the Gazebo world file (`.world`).

### Gravity

You can set the gravity vector for your Gazebo world. The default is typically `0 0 -9.8`, simulating Earth's gravity.

```xml
<world name="default">
  <gravity>0 0 -9.8</gravity>
  <!-- ... other world elements ... -->
</world>
```

### Physics Engine Properties

The `<physics>` element allows you to choose the physics engine and configure its parameters. Common engines include `ode` (Open Dynamics Engine) and `dart`.

```xml
<world name="default">
  <physics name="default_physics" default="true" type="ode">
    <max_step_size>0.001</max_step_size> <!-- Simulation step size -->
    <real_time_factor>1.0</real_time_factor> <!-- 1.0 means real-time simulation -->
    <real_time_update_rate>1000</real_time_update_rate> <!-- How often physics is updated -->
    <ode>
      <solver>
        <type>quick</type>
        <iters>50</iters>
        <sor>1.3</sor>
        <erp>0.2</erp>
      </solver>
      <constraints>
        <cfm>0</cfm>
        <erp>0.2</erp>
        <contact_max_correcting_vel>100</contact_max_correcting_vel>
        <contact_surface_layer>0.001</contact_surface_layer>
      </constraints>
    </ode>
  </physics>
  <!-- ... other world elements ... -->
</world>
```

### Friction and Restitution

Friction and restitution (bounciness) are defined within the `<surface>` element of a link's `<collision>` properties in the URDF (or SDF).

```xml
<link name="my_link">
  <collision name="my_collision">
    <geometry>
      <box size="0.1 0.1 0.1"/>
    </geometry>
    <surface>
      <friction>
        <ode>
          <mu>0.8</mu>   <!-- Coefficient of static friction -->
          <mu2>0.8</mu2>  <!-- Coefficient of dynamic friction -->
          <fdir1>0 0 1</fdir1> <!-- Direction of primary friction cone -->
        </ode>
      </friction>
      <bounce>
        <restitution_coefficient>0.1</restitution_coefficient> <!-- Bounciness (0=no bounce, 1=max bounce) -->
        <threshold>0.05</threshold> <!-- Minimum impact velocity for bounce -->
      </bounce>
    </surface>
  </collision>
</link>
```
---
sidebar_position: 2
---

# Simulating the Robot in Gazebo

This chapter focuses on developing content for using the Gazebo simulator for our robot.

## Subtasks:

-   Write a guide on importing a URDF model into a Gazebo world.
-   Explain how to add and configure physics properties (e.g., friction, gravity).
-   Document how to add simulated sensors (camera, LiDAR) to the model.

## Importing a URDF Model into a Gazebo World

Gazebo is a powerful 3D robot simulator that works seamlessly with ROS 2. To simulate your robot, you'll first need to get your URDF model into a Gazebo world.

### Prerequisites

1.  **Gazebo Installation**: Ensure you have Gazebo installed. If you're using ROS 2, it typically comes with a Gazebo version (e.g., Gazebo Classic or Gazebo Sim, formerly Ignition Gazebo).
2.  **URDF Model**: You should have a valid URDF file for your robot, as created in the previous chapter.

### Steps to Import

1.  **Create a Gazebo World File (Optional but Recommended)**:
    While you can directly launch a URDF in an empty Gazebo instance, defining a world file (`.world`) allows you to add environments, lights, and other static objects. Create a file (e.g., `my_robot.world`) in your ROS 2 package's `worlds` directory (or similar):

    ```xml
    <?xml version="1.0" ?>
    <sdf version="1.6">
      <world name="default">
        <include>
          <uri>model://sun</uri>
        </include>
        <include>
          <uri>model://ground_plane</uri>
        </include>
        <!-- Your robot will be spawned here -->
      </world>
    </sdf>
    ```

2.  **Create a Launch File to Spawn the Robot**:
    You'll typically use a ROS 2 launch file (Python or XML) to start Gazebo and spawn your robot. This allows for easier integration with other ROS 2 nodes.

    Create a Python launch file (e.g., `spawn_robot.launch.py`) in your package's `launch` directory:

    ```python
    import os
    from ament_index_python.packages import get_package_share_directory
    from launch import LaunchDescription
    from launch.actions import IncludeLaunchDescription
    from launch.launch_description_sources import PythonLaunchDescriptionSource
    from launch_ros.actions import Node

    def generate_launch_description():
        # Get the path to your URDF file
        pkg_path = get_package_share_directory('my_package') # Replace 'my_package' with your package name
        urdf_file = os.path.join(pkg_path, 'urdf', 'simple_arm.urdf') # Replace 'simple_arm.urdf'

        # Gazebo launch
        gazebo = IncludeLaunchDescription(
            PythonLaunchDescriptionSource([os.path.join(
                get_package_share_directory('gazebo_ros'), 'launch', 'gazebo.launch.py')]),
            launch_arguments={'world': os.path.join(pkg_path, 'worlds', 'my_robot.world')}.items(), # Optional: use your custom world
        )

        # Node to publish the robot description to the /robot_description topic
        robot_state_publisher_node = Node(
            package='robot_state_publisher',
            executable='robot_state_publisher',
            name='robot_state_publisher',
            output='screen',
            parameters=[{'robot_description': open(urdf_file).read()}],
        )

        # Node to spawn the robot in Gazebo
        spawn_entity = Node(package='gazebo_ros', executable='spawn_entity.py',
                            arguments=['-topic', 'robot_description',
                                       '-entity', 'simple_arm'],
                            output='screen')

        return LaunchDescription([
            gazebo,
            robot_state_publisher_node,
            spawn_entity,
        ])
    ```
    Make sure your URDF file is located at `my_package/urdf/simple_arm.urdf` and is included in your `setup.py`'s `data_files` for installation.

3.  **Run the Launch File**:
    After building your workspace (`colcon build`) and sourcing it, you can run:

    ```bash
    ros2 launch my_package spawn_robot.launch.py
    ```
    This command will start Gazebo (either Gazebo Classic or Gazebo Sim, depending on your setup) and spawn your robot model into the world. You should then see your robot in the Gazebo simulator.

## Configuring Physics Properties in Gazebo

Gazebo's physics engine simulates the real-world behavior of robots and objects. You can configure various physics properties to achieve realistic or desired simulation outcomes. These properties are typically defined within the Gazebo world file (`.world`).

### Gravity

You can set the gravity vector for your Gazebo world. The default is typically `0 0 -9.8`, simulating Earth's gravity.

```xml
<world name="default">
  <gravity>0 0 -9.8</gravity>
  <!-- ... other world elements ... -->
</world>
```

### Physics Engine Properties

The `<physics>` element allows you to choose the physics engine and configure its parameters. Common engines include `ode` (Open Dynamics Engine) and `dart`.

```xml
<world name="default">
  <physics name="default_physics" default="true" type="ode">
    <max_step_size>0.001</max_step_size> <!-- Simulation step size -->
    <real_time_factor>1.0</real_time_factor> <!-- 1.0 means real-time simulation -->
    <real_time_update_rate>1000</real_time_update_rate> <!-- How often physics is updated -->
    <ode>
      <solver>
        <type>quick</type>
        <iters>50</iters>
        <sor>1.3</sor>
        <erp>0.2</erp>
      </solver>
      <constraints>
        <cfm>0</cfm>
        <erp>0.2</erp>
        <contact_max_correcting_vel>100</contact_max_correcting_vel>
        <contact_surface_layer>0.001</contact_surface_layer>
      </constraints>
    </ode>
  </physics>
  <!-- ... other world elements ... -->
</world>
```

### Friction and Restitution

Friction and restitution (bounciness) are defined within the `<surface>` element of a link's `<collision>` properties in the URDF (or SDF).

```xml
<link name="my_link">
  <collision name="my_collision">
    <geometry>
      <box size="0.1 0.1 0.1"/>
    </geometry>
    <surface>
      <friction>
        <ode>
          <mu>0.8</mu>   <!-- Coefficient of static friction -->
          <mu2>0.8</mu2>  <!-- Coefficient of dynamic friction -->
          <fdir1>0 0 1</fdir1> <!-- Direction of primary friction cone -->
        </ode>
      </friction>
      <bounce>
        <restitution_coefficient>0.1</restitution_coefficient> <!-- Bounciness (0=no bounce, 1=max bounce) -->
        <threshold>0.05</threshold> <!-- Minimum impact velocity for bounce -->
      </bounce>
    </surface>
  </collision>
</link>
```
Adjusting these values allows you to control how your robot interacts with its environment, preventing unrealistic slipping or excessive bounciness.

## Adding Simulated Sensors (Camera, LiDAR) to the Model

Simulated sensors are crucial for giving your robot the ability to perceive its environment within Gazebo. These are typically added to your robot's URDF (or SDF) file using Gazebo plugins.

### Gazebo Plugins

Gazebo plugins are shared libraries that Gazebo loads at runtime to extend its functionality. For sensors, you'll use specific plugins that simulate the sensor's behavior and publish data to ROS 2 topics.

### Adding a Simulated Camera

To add a camera, you'll typically attach it to a link in your URDF and then add a Gazebo camera plugin.

1.  **Define a Camera Link and Joint (in URDF)**:
    First, define a new link for your camera and connect it to an existing link (e.g., `link2` from our `simple_arm` example) using a fixed joint.

    ```xml
    <link name="camera_link">
      <visual>
        <geometry>
          <box size="0.01 0.05 0.05"/>
        </geometry>
      </visual>
      <collision>
        <geometry>
          <box size="0.01 0.05 0.05"/>
        </geometry>
      </collision>
      <inertial>
        <mass value="0.01"/>
        <origin xyz="0 0 0"/>
        <inertia ixx="1e-6" ixy="0" ixz="0" iyy="1e-6" iyz="0" izz="1e-6"/>
      </inertial>
    </link>

    <joint name="camera_joint" type="fixed">
      <parent link="link2"/>
      <child link="camera_link"/>
      <origin xyz="0.05 0 0.1" rpy="0 0 0"/>
    </joint>
    ```

2.  **Add the Gazebo Camera Plugin (in a separate Gazebo tag in URDF)**:
    You need to add a `<gazebo>` tag in your URDF that refers to the `camera_link` and specifies the camera plugin.

    ```xml
    <gazebo reference="camera_link">
      <material>Gazebo/Red</material>
      <sensor name="camera" type="camera">
        <pose>0 0 0 0 0 0</pose>
        <visualize>true</visualize>
        <update_rate>30.0</update_rate>
        <camera>
          <horizontal_fov>1.089</horizontal_fov>
          <image>
            <width>640</width>
            <height>480</height>
            <format>R8G8B8</format>
          </image>
          <clip>
            <near>0.05</near>
            <far>8.0</far>
          </clip>
        </camera>
        <plugin name="camera_controller" filename="libgazebo_ros_camera.so">
          <ros>
            <namespace>/</namespace>
            <argument>--ros-args -r image:=camera/image_raw -r camera_info:=camera/camera_info</argument>
          </ros>
          <camera_name>my_robot_camera</camera_name>
          <frame_name>camera_link_optical</frame_name>
        </plugin>
      </sensor>
    </gazebo>
    ```
    This configuration will publish camera images and info to ROS 2 topics like `/camera/image_raw` and `/camera/camera_info`.

### Adding a Simulated LiDAR Sensor

Similar to the camera, a LiDAR (Light Detection and Ranging) sensor can be added using a Gazebo plugin.

1.  **Define a LiDAR Link and Joint (in URDF)**:
    ```xml
    <link name="hokuyo_link">
      <visual>
        <origin xyz="0 0 0" rpy="0 0 0"/>
        <geometry>
          <mesh filename="package://ur_description/meshes/sensors/hokuyo.dae"/> <!-- Example mesh -->
        </geometry>
      </visual>
      <collision>
        <origin xyz="0 0 0" rpy="0 0 0"/>
        <geometry>
          <box size="0.1 0.1 0.1"/>
        </geometry>
      </collision>
      <inertial>
        <mass value="0.1"/>
        <origin xyz="0 0 0"/>
        <inertia ixx="1e-6" ixy="0" ixz="0" iyy="1e-6" iyz="0" izz="1e-6"/>
      </inertial>
    </link>

    <joint name="hokuyo_joint" type="fixed">
      <origin xyz="0.05 0 0.15" rpy="0 0 0"/>
      <parent link="base_link"/>
      <child link="hokuyo_link"/>
    </joint>
    ```

2.  **Add the Gazebo LiDAR Plugin (in a separate Gazebo tag in URDF)**:
    ```xml
    <gazebo reference="hokuyo_link">
      <sensor type="ray" name="head_hokuyo_sensor">
        <pose>0 0 0 0 0 0</pose>
        <visualize>true</visualize>
        <update_rate>40</update_rate>
        <ray>
          <scan>
            <horizontal>
              <samples>720</samples>
              <resolution>1</resolution>
              <min_angle>-1.570796</min_angle>
              <max_angle>1.570796</max_angle>
            </horizontal>
          </scan>
          <range>
            <min>0.10</min>
            <max>10.0</max>
            <resolution>0.01</resolution>
          </range>
        </ray>
        <plugin name="gazebo_ros_head_hokuyo_controller" filename="libgazebo_ros_ray_sensor.so">
          <ros>
            <argument>--ros-args -r scan:=my_robot/out/scan</argument>
          </ros>
          <output_type>sensor_msgs/LaserScan</output_type>
          <frame_name>hokuyo_link</frame_name>
        </plugin>
      </sensor>
    </gazebo>
    ```
    This configuration will publish `LaserScan` messages to a ROS 2 topic like `/my_robot/out/scan`.

By following these steps, you can equip your simulated robot with various sensors, enabling it to perceive and interact with its Gazebo environment, just like a real robot.
