---
sidebar_position: 2
---

# Capstone Project: Simulation Setup

This chapter details how to build the environment and robot in Isaac Sim for the "Make Coffee" capstone project.

## Subtasks:

-   Create the complete humanoid model and import it into Isaac Sim.
-   Build the simulated environment (e.g., a kitchen, a living room).
-   Configure ROS 2 bridges for all sensors and actuators.

## Creating and Importing the Complete Humanoid Model into Isaac Sim

To begin our Capstone Project, we need to set up the humanoid robot within the Isaac Sim environment. This involves either utilizing a pre-existing humanoid model from Isaac Sim's extensive library or importing a custom model. For the "make coffee" task, we'll aim for a humanoid with articulated arms and grippers, suitable for complex manipulation.

### Utilizing Pre-existing Humanoid Models (Recommended)

Isaac Sim comes with several high-quality humanoid robot models that are pre-configured with physics, joints, and often basic controllers. This is the recommended approach to save time and leverage optimized assets.

1.  **Launch Isaac Sim**: Start Isaac Sim from the Omniverse Launcher.
2.  **Open a New Stage**: Go to `File -> New Stage` or `File -> Open` and select an empty stage template.
3.  **Browse Assets**:
    -   In the Content Window (usually at the bottom), navigate to `Asset -> Isaac -> Robots -> Humanoids`.
    -   You might find models like `Unitree_H1`, `DRC_Hubo`, or other humanoid representations.
4.  **Drag and Drop**: Drag the chosen humanoid model (e.g., `Unitree_H1.usd`) directly into the Viewport or the Stage window.
5.  **Verify Physics**:
    -   Select the humanoid in the Stage window.
    -   In the Property window, ensure its physics properties are correctly set (e.g., `RigidBody` component is enabled, collision and inertial properties are defined).
    -   Press the "Play" button in the toolbar to see if the robot stands stably or reacts realistically to gravity.

### Importing a Custom Humanoid Model

If a suitable pre-existing model is not available, you can import your own.

1.  **Prepare Your Model**: Your humanoid model should ideally be in a USD (Universal Scene Description) format. If you have it in URDF or MJCF, Isaac Sim can import these, but conversion to USD is often part of the process.
    -   **URDF Import**: Go to `File -> Import`. Select your URDF file. Isaac Sim will attempt to convert it to a USD stage. You'll need to configure physics, materials, and potentially add missing elements manually.
    -   **MJCF Import**: Similar to URDF, MJCF models can also be imported.
2.  **Refine and Configure**: After importing:
    -   **Add Physics**: Ensure each link has a `RigidBody` component and correct inertial properties.
    -   **Add Joints**: Verify that all joints are correctly defined with their type (revolute, prismatic, fixed) and limits.
    -   **Materials and Textures**: Apply appropriate materials and textures for visual realism.
    -   **Collision Geometries**: Define simplified collision geometries for efficient physics simulation.

### Attaching Required Sensors

Once the humanoid model is in the scene, you'll need to attach the sensors designed in the previous task. This is typically done by adding sensor prims (USD primitives) and configuring them.

1.  **Head Camera (RGB-D)**:
    -   **Add Camera Prim**: In the Stage window, right-click on the `head_link` (or equivalent) of your humanoid, then `Create -> Camera -> Camera`.
    -   **Position and Orient**: Adjust the `translate` and `orient` properties of the camera prim to place it correctly on the head, facing forward.
    -   **Configure ROS 2 Interface**: Add the `OmniPVD` (Omniverse Physics Visual Debugger) and `ROS2 Camera` components to the camera prim. Configure parameters like update rate, image resolution, and ROS 2 topic names (e.g., `/robot/camera/rgb`, `/robot/camera/depth`, `/robot/camera/info`).
2.  **Wrist Camera (RGB-D)**:
    -   Follow similar steps as the head camera, attaching it to the `wrist_link` or `end_effector_link`.
3.  **LiDAR Sensor**:
    -   **Add LiDAR Prim**: Right-click on a suitable link (e.g., torso or base), `Create -> Isaac -> Sensors -> LiDAR Sensor`.
    -   **Configure Properties**: Adjust `minRange`, `maxRange`, `drawPoints`, `horizontal/vertical_fov`, `rotation_rate`, `num_points`.
    -   **Configure ROS 2 Interface**: Add the `ROS2 LiDAR` component to the LiDAR prim, configuring the ROS 2 topic (e.g., `/robot/lidar_scan`).
4.  **IMU Sensor**:
    -   **Add IMU Prim**: Right-click on the `base_link` or `torso_link`, `Create -> Isaac -> Sensors -> IMU Sensor`.
    -   **Configure Properties**: Set `update_frequency`, `accelerometer_noise_density`, `gyroscope_noise_density`.
    -   **Configure ROS 2 Interface**: Add the `ROS2 IMU` component, configuring the ROS 2 topic (e.g., `/robot/imu/data`).
5.  **Force/Torque Sensors**:
    -   These are typically configured on specific joints or contact points, often as part of the `ros2_control` setup within Isaac Sim.

---
sidebar_position: 2
---

# Capstone Project: Simulation Setup

This chapter details how to build the environment and robot in Isaac Sim for the "Make Coffee" capstone project.

## Subtasks:

-   Create the complete humanoid model and import it into Isaac Sim.
-   Build the simulated environment (e.g., a kitchen, a living room).
-   Configure ROS 2 bridges for all sensors and actuators.

## Creating and Importing the Complete Humanoid Model into Isaac Sim

To begin our Capstone Project, we need to set up the humanoid robot within the Isaac Sim environment. This involves either utilizing a pre-existing humanoid model from Isaac Sim's extensive library or importing a custom model. For the "make coffee" task, we'll aim for a humanoid with articulated arms and grippers, suitable for complex manipulation.

### Utilizing Pre-existing Humanoid Models (Recommended)

Isaac Sim comes with several high-quality humanoid robot models that are pre-configured with physics, joints, and often basic controllers. This is the recommended approach to save time and leverage optimized assets.

1.  **Launch Isaac Sim**: Start Isaac Sim from the Omniverse Launcher.
2.  **Open a New Stage**: Go to `File -> New Stage` or `File -> Open` and select an empty stage template.
3.  **Browse Assets**:
    -   In the Content Window (usually at the bottom), navigate to `Asset -> Isaac -> Robots -> Humanoids`.
    -   You might find models like `Unitree_H1`, `DRC_Hubo`, or other humanoid representations.
4.  **Drag and Drop**: Drag the chosen humanoid model (e.g., `Unitree_H1.usd`) directly into the Viewport or the Stage window.
5.  **Verify Physics**:
    -   Select the humanoid in the Stage window.
    -   In the Property window, ensure its physics properties are correctly set (e.g., `RigidBody` component is enabled, collision and inertial properties are defined).
    -   Press the "Play" button in the toolbar to see if the robot stands stably or reacts realistically to gravity.

### Importing a Custom Humanoid Model

If a suitable pre-existing model is not available, you can import your own.

1.  **Prepare Your Model**: Your humanoid model should ideally be in a USD (Universal Scene Description) format. If you have it in URDF or MJCF, Isaac Sim can import these, but conversion to USD is often part of the process.
    -   **URDF Import**: Go to `File -> Import`. Select your URDF file. Isaac Sim will attempt to convert it to a USD stage. You'll need to configure physics, materials, and potentially add missing elements manually.
    -   **MJCF Import**: Similar to URDF, MJCF models can also be imported.
2.  **Refine and Configure**: After importing:
    -   **Add Physics**: Ensure each link has a `RigidBody` component and correct inertial properties.
    -   **Add Joints**: Verify that all joints are correctly defined with their type (revolute, prismatic, fixed) and limits.
    -   **Materials and Textures**: Apply appropriate materials and textures for visual realism.
    -   **Collision Geometries**: Define simplified collision geometries for efficient physics simulation.

### Attaching Required Sensors

Once the humanoid model is in the scene, you'll need to attach the sensors designed in the previous task. This is typically done by adding sensor prims (USD primitives) and configuring them.

1.  **Head Camera (RGB-D)**:
    -   **Add Camera Prim**: In the Stage window, right-click on the `head_link` (or equivalent) of your humanoid, then `Create -> Camera -> Camera`.
    -   **Position and Orient**: Adjust the `translate` and `orient` properties of the camera prim to place it correctly on the head, facing forward.
    -   **Configure ROS 2 Interface**: Add the `OmniPVD` (Omniverse Physics Visual Debugger) and `ROS2 Camera` components to the camera prim. Configure parameters like update rate, image resolution, and ROS 2 topic names (e.g., `/robot/camera/rgb`, `/robot/camera/depth`, `/robot/camera/info`).
2.  **Wrist Camera (RGB-D)**:
    -   Follow similar steps as the head camera, attaching it to the `wrist_link` or `end_effector_link`.
3.  **LiDAR Sensor**:
    -   **Add LiDAR Prim**: Right-click on a suitable link (e.g., torso or base), `Create -> Isaac -> Sensors -> LiDAR Sensor`.
    -   **Configure Properties**: Adjust `minRange`, `maxRange`, `drawPoints`, `horizontal/vertical_fov`, `rotation_rate`, `num_points`.
    -   **Configure ROS 2 Interface**: Add the `ROS2 LiDAR` component to the LiDAR prim, configuring the ROS 2 topic (e.g., `/robot/lidar_scan`).
4.  **IMU Sensor**:
    -   **Add IMU Prim**: Right-click on the `base_link` or `torso_link`, `Create -> Isaac -> Sensors -> IMU Sensor`.
    -   **Configure Properties**: Set `update_frequency`, `accelerometer_noise_density`, `gyroscope_noise_density`.
    -   **Configure ROS 2 Interface**: Add the `ROS2 IMU` component, configuring the ROS 2 topic (e.g., `/robot/imu/data`).
5.  **Force/Torque Sensors**:
    -   These are typically configured on specific joints or contact points, often as part of the `ros2_control` setup within Isaac Sim.

After adding and configuring all sensors, save your Isaac Sim stage (`File -> Save As`) as a new USD file (e.g., `humanoid_coffee_bot.usd`) within your project. This complete humanoid model with integrated sensors is now ready to interact with the simulated kitchen environment.

## Building the Simulated Environment: A Kitchen Scene

For the "make coffee" task, a realistic kitchen environment is essential. Isaac Sim provides tools and assets to create detailed and interactive scenes.

### Utilizing Existing Omniverse Assets

The easiest way to build a rich environment is to leverage the vast library of 3D assets available through Omniverse Nucleus servers.

1.  **Access Omniverse Nucleus**: In the Content Window, navigate to your connected Nucleus servers (e.g., `omniverse://localhost/` or `omniverse://ov-content/`).
2.  **Browse for Kitchen Assets**: Look for categories like "Props," "Environments," "Architecture," or specific keywords like "kitchen," "cabinet," "table," "coffee machine," "mug."
3.  **Drag and Drop**: Drag and drop relevant assets into your Isaac Sim stage.
    -   **Kitchen Layout**: Start with a basic kitchen layout (walls, floor, ceiling, countertop).
    -   **Furniture**: Add cabinets, a refrigerator, and a table.
    -   **Appliances**: Import a coffee machine model. Ensure it has a dispenser, a button (which can be made interactive), and a hot plate area.
    -   **Props**: Place coffee mugs, perhaps a coffee pot, and other kitchen clutter to make the scene realistic and provide distractors for the perception system.

### Creating Custom Environment Elements

If specific assets are not available, you can create them within Isaac Sim or import them from external 3D modeling software.

1.  **Basic Primitives**: Use `Create -> Mesh -> Cube`, `Sphere`, `Cylinder` to build simple shapes for tables, shelves, or walls. Modify their `scale`, `translate`, and `material` properties.
2.  **Adding Materials**:
    -   Select a mesh in the Stage window.
    -   In the Property window, go to `Render -> Material`. You can apply existing Omniverse materials or import custom ones.
    -   For visual sensors, ensure textures and materials provide enough visual detail.
3.  **Physics Properties for Interactive Objects**:
    -   For objects the robot will interact with (mugs, coffee machine button), ensure they have `RigidBody` physics enabled and appropriate collision and inertial properties.
    -   **Coffee Machine Button**: A small cylindrical or cuboid mesh can represent the button. You can add a `Fixed Joint` or `Prismatic Joint` constraint to simulate its pressable action.
4.  **Lighting**:
    -   `Create -> Light -> Dome Light` or `Distant Light` to illuminate the scene realistically. Good lighting is crucial for sensor fidelity.
    -   Adjust light `intensity`, `temperature`, and `shadow` properties.

### Important Environment Considerations for the "Make Coffee" Task

-   **Coffee Machine Interaction**: Ensure the coffee machine model allows for programmatic interaction (e.g., a clearly defined "button" that can be pressed by the robot's end-effector). This might involve adding specific prims with collision properties for the button.
-   **Mug Placement**: Define clear locations where mugs can be placed (e.g., on the table, under the coffee dispenser).
-   **Randomization**: To train a robust VLA, introduce randomization to the environment during data collection or training:
    -   **Object Poses**: Randomize the initial positions and orientations of mugs, blocks, etc.
    -   **Lighting**: Randomize light intensity and direction.
    -   **Textures**: Randomize textures of surfaces and objects.

---
sidebar_position: 2
---

# Capstone Project: Simulation Setup

This chapter details how to build the environment and robot in Isaac Sim for the "Make Coffee" capstone project.

## Subtasks:

-   Create the complete humanoid model and import it into Isaac Sim.
-   Build the simulated environment (e.g., a kitchen, a living room).
-   Configure ROS 2 bridges for all sensors and actuators.

## Creating and Importing the Complete Humanoid Model into Isaac Sim

To begin our Capstone Project, we need to set up the humanoid robot within the Isaac Sim environment. This involves either utilizing a pre-existing humanoid model from Isaac Sim's extensive library or importing a custom model. For the "make coffee" task, we'll aim for a humanoid with articulated arms and grippers, suitable for complex manipulation.

### Utilizing Pre-existing Humanoid Models (Recommended)

Isaac Sim comes with several high-quality humanoid robot models that are pre-configured with physics, joints, and often basic controllers. This is the recommended approach to save time and leverage optimized assets.

1.  **Launch Isaac Sim**: Start Isaac Sim from the Omniverse Launcher.
2.  **Open a New Stage**: Go to `File -> New Stage` or `File -> Open` and select an empty stage template.
3.  **Browse Assets**:
    -   In the Content Window (usually at the bottom), navigate to `Asset -> Isaac -> Robots -> Humanoids`.
    -   You might find models like `Unitree_H1`, `DRC_Hubo`, or other humanoid representations.
4.  **Drag and Drop**: Drag the chosen humanoid model (e.g., `Unitree_H1.usd`) directly into the Viewport or the Stage window.
5.  **Verify Physics**:
    -   Select the humanoid in the Stage window.
    -   In the Property window, ensure its physics properties are correctly set (e.g., `RigidBody` component is enabled, collision and inertial properties are defined).
    -   Press the "Play" button in the toolbar to see if the robot stands stably or reacts realistically to gravity.

### Importing a Custom Humanoid Model

If a suitable pre-existing model is not available, you can import your own.

1.  **Prepare Your Model**: Your humanoid model should ideally be in a USD (Universal Scene Description) format. If you have it in URDF or MJCF, Isaac Sim can import these, but conversion to USD is often part of the process.
    -   **URDF Import**: Go to `File -> Import`. Select your URDF file. Isaac Sim will attempt to convert it to a USD stage. You'll need to configure physics, materials, and potentially add missing elements manually.
    -   **MJCF Import**: Similar to URDF, MJCF models can also be imported.
2.  **Refine and Configure**: After importing:
    -   **Add Physics**: Ensure each link has a `RigidBody` component and correct inertial properties.
    -   **Add Joints**: Verify that all joints are correctly defined with their type (revolute, prismatic, fixed) and limits.
    -   **Materials and Textures**: Apply appropriate materials and textures for visual realism.
    -   **Collision Geometries**: Define simplified collision geometries for efficient physics simulation.

### Attaching Required Sensors

Once the humanoid model is in the scene, you'll need to attach the sensors designed in the previous task. This is typically done by adding sensor prims (USD primitives) and configuring them.

1.  **Head Camera (RGB-D)**:
    -   **Add Camera Prim**: In the Stage window, right-click on the `head_link` (or equivalent) of your humanoid, then `Create -> Camera -> Camera`.
    -   **Position and Orient**: Adjust the `translate` and `orient` properties of the camera prim to place it correctly on the head, facing forward.
    -   **Configure ROS 2 Interface**: Add the `OmniPVD` (Omniverse Physics Visual Debugger) and `ROS2 Camera` components to the camera prim. Configure parameters like update rate, image resolution, and ROS 2 topic names (e.g., `/robot/camera/rgb`, `/robot/camera/depth`, `/robot/camera/info`).
2.  **Wrist Camera (RGB-D)**:
    -   Follow similar steps as the head camera, attaching it to the `wrist_link` or `end_effector_link`.
3.  **LiDAR Sensor**:
    -   **Add LiDAR Prim**: Right-click on a suitable link (e.g., torso or base), `Create -> Isaac -> Sensors -> LiDAR Sensor`.
    -   **Configure Properties**: Adjust `minRange`, `maxRange`, `drawPoints`, `horizontal/vertical_fov`, `rotation_rate`, `num_points`.
    -   **Configure ROS 2 Interface**: Add the `ROS2 LiDAR` component to the LiDAR prim, configuring the ROS 2 topic (e.g., `/robot/lidar_scan`).
4.  **IMU Sensor**:
    -   **Add IMU Prim**: Right-click on the `base_link` or `torso_link`, `Create -> Isaac -> Sensors -> IMU Sensor`.
    -   **Configure Properties**: Set `update_frequency`, `accelerometer_noise_density`, `gyroscope_noise_density`.
    -   **Configure ROS 2 Interface**: Add the `ROS2 IMU` component, configuring the ROS 2 topic (e.g., `/robot/imu/data`).
5.  **Force/Torque Sensors**:
    -   These are typically configured on specific joints or contact points, often as part of the `ros2_control` setup within Isaac Sim.

After adding and configuring all sensors, save your Isaac Sim stage (`File -> Save As`) as a new USD file (e.g., `humanoid_coffee_bot.usd`) within your project. This complete humanoid model with integrated sensors is now ready to interact with the simulated kitchen environment.

## Building the Simulated Environment: A Kitchen Scene

For the "make coffee" task, a realistic kitchen environment is essential. Isaac Sim provides tools and assets to create detailed and interactive scenes.

### Utilizing Existing Omniverse Assets

The easiest way to build a rich environment is to leverage the vast library of 3D assets available through Omniverse Nucleus servers.

1.  **Access Omniverse Nucleus**: In the Content Window, navigate to your connected Nucleus servers (e.g., `omniverse://localhost/` or `omniverse://ov-content/`).
2.  **Browse for Kitchen Assets**: Look for categories like "Props," "Environments," "Architecture," or specific keywords like "kitchen," "cabinet," "table," "coffee machine," "mug."
3.  **Drag and Drop**: Drag and drop relevant assets into your Isaac Sim stage.
    -   **Kitchen Layout**: Start with a basic kitchen layout (walls, floor, ceiling, countertop).
    -   **Furniture**: Add cabinets, a refrigerator, and a table.
    -   **Appliances**: Import a coffee machine model. Ensure it has a dispenser, a button (which can be made interactive), and a hot plate area.
    -   **Props**: Place coffee mugs, perhaps a coffee pot, and other kitchen clutter to make the scene realistic and provide distractors for the perception system.

### Creating Custom Environment Elements

If specific assets are not available, you can create them within Isaac Sim or import them from external 3D modeling software.

1.  **Basic Primitives**: Use `Create -> Mesh -> Cube`, `Sphere`, `Cylinder` to build simple shapes for tables, shelves, or walls. Modify their `scale`, `translate`, and `material` properties.
2.  **Adding Materials**:
    -   Select a mesh in the Stage window.
    -   In the Property window, go to `Render -> Material`. You can apply existing Omniverse materials or import custom ones.
    -   For visual sensors, ensure textures and materials provide enough visual detail.
3.  **Physics Properties for Interactive Objects**:
    -   For objects the robot will interact with (mugs, coffee machine button), ensure they have `RigidBody` physics enabled and appropriate collision and inertial properties.
    -   **Coffee Machine Button**: A small cylindrical or cuboid mesh can represent the button. You can add a `Fixed Joint` or `Prismatic Joint` constraint to simulate its pressable action.
4.  **Lighting**:
    -   `Create -> Light -> Dome Light` or `Distant Light` to illuminate the scene realistically. Good lighting is crucial for sensor fidelity.
    -   Adjust light `intensity`, `temperature`, and `shadow` properties.

### Important Environment Considerations for the "Make Coffee" Task

-   **Coffee Machine Interaction**: Ensure the coffee machine model allows for programmatic interaction (e.g., a clearly defined "button" that can be pressed by the robot's end-effector). This might involve adding specific prims with collision properties for the button.
-   **Mug Placement**: Define clear locations where mugs can be placed (e.g., on the table, under the coffee dispenser).
-   **Randomization**: To train a robust VLA, introduce randomization to the environment during data collection or training:
    -   **Object Poses**: Randomize the initial positions and orientations of mugs, blocks, etc.
    -   **Lighting**: Randomize light intensity and direction.
    -   **Textures**: Randomize textures of surfaces and objects.

By carefully constructing a detailed and interactive kitchen environment, we create a realistic simulation sandbox for our humanoid robot to learn and execute the "make coffee" task.

## Configuring ROS 2 Bridges for All Sensors and Actuators

Seamless communication between Isaac Sim and the ROS 2 ecosystem is critical for our capstone project. This is achieved through the `ros_ign_bridge` (for Ignition/Gazebo Sim) or the native ROS 2 components provided within Isaac Sim. We need to ensure that all sensor data (perception) is published to ROS 2 and all robot control commands (actuation) can be received from ROS 2.

### Sensor Data Bridging

As discussed in earlier modules, Isaac Sim provides direct ROS 2 interfaces for many sensor types. These are usually configured when you add the sensor prims to your robot model.

1.  **RGB-D Camera Data**:
    -   **Configuration**: When adding the `ROS2 Camera` component to your camera prims (head and wrist cameras), specify the desired ROS 2 topic names.
    -   **Output Topics**:
        -   `/robot/camera/head/image_raw` (`sensor_msgs/Image`)
        -   `/robot/camera/head/depth/image_raw` (`sensor_msgs/Image` for depth)
        -   `/robot/camera/head/camera_info` (`sensor_msgs/CameraInfo`)
        -   (Similar topics for the wrist camera)

2.  **LiDAR Scan Data**:
    -   **Configuration**: The `ROS2 LiDAR` component on your LiDAR sensor prim will publish scan data.
    -   **Output Topic**: `/robot/lidar_scan` (`sensor_msgs/LaserScan` or `sensor_msgs/PointCloud2` depending on configuration).

3.  **IMU Data**:
    -   **Configuration**: The `ROS2 IMU` component on your IMU sensor prim.
    -   **Output Topic**: `/robot/imu/data` (`sensor_msgs/Imu`).

4.  **Joint States**:
    -   **Configuration**: Joint state publishers are typically part of the `ros2_control` setup. Isaac Sim's `ros2_control` integration will publish the robot's joint positions, velocities, and efforts.
    -   **Output Topic**: `/joint_states` (`sensor_msgs/JointState`).

### Actuator Control Bridging (ROS 2 Control)

For controlling the robot's joints and gripper, we'll rely on the `ros2_control` framework, which integrates directly with Isaac Sim.

1.  **Robot Description (URDF/XACRO)**:
    -   Ensure your robot's URDF/XACRO model includes the `<ros2_control>` tags defining the hardware interfaces and joints, as covered in Module 2.
    -   This defines which joints are controllable and what type of control is expected (position, velocity, effort).

2.  **Controller Configuration (YAML)**:
    -   Create YAML files (`.yaml`) to define your ROS 2 controllers, such as `joint_state_broadcaster` and `joint_trajectory_controller` (for the arm/legs) or a `gripper_controller`.
    -   Example for a `joint_trajectory_controller`:
        ```yaml
        controller_manager:
          ros__parameters:
            update_rate: 100

        joint_state_broadcaster:
          ros__parameters:
            type: joint_state_broadcaster/JointStateBroadcaster

        arm_controller: # Example for an arm
          ros__parameters:
            type: joint_trajectory_controller/JointTrajectoryController
            joints:
              - arm_joint_1
              - arm_joint_2
              # ... all arm joints
            command_interfaces:
              - position
            state_interfaces:
              - position
              - velocity
        ```

3.  **Launching Controllers**:
    -   Use a ROS 2 launch file to load the `ros2_control` node and spawn your defined controllers within the Isaac Sim environment.
    -   **Input Topics**:
        -   `/arm_controller/joint_trajectory` (`trajectory_msgs/JointTrajectory`): For sending desired joint trajectories to the robot's arm.
        -   `/gripper_controller/gripper_command` (custom message or `control_msgs/GripperCommand`): For opening/closing the gripper.
        -   `/cmd_vel` (`geometry_msgs/Twist`): For controlling the robot's mobile base (if it has one).

### End-to-End Bridging Workflow

1.  **Isaac Sim**: Simulates the robot and environment, publishes sensor data to its internal topics, and receives commands.
2.  **ROS 2 Bridge (Internal to Isaac Sim)**: Converts Isaac Sim's internal data to ROS 2 messages and publishes them to ROS 2 topics. Also converts ROS 2 commands to Isaac Sim's internal format.
3.  **ROS 2 Nodes**: Your perception, cognition (VLA brain), and control nodes subscribe to sensor data topics, process information, make decisions, and publish command messages to control topics.

By carefully configuring these ROS 2 bridges, we establish the full communication pipeline, enabling the VLA brain to perceive the simulated kitchen, plan actions based on "make coffee" instructions, and send precise commands to the humanoid robot's actuators.
