---
sidebar_position: 1
---

# Capstone Project: Project Scoping and Design

This chapter defines the goals and architecture for the capstone project.

## Subtasks:

-   Select a specific task (e.g., "make coffee," "water a plant").
-   Design the humanoid robot's URDF and required sensors.
-   Outline the complete software architecture, from ROS 2 nodes to the VLA brain.

## Selecting a Specific Task: "Make Coffee"

For our capstone project, we will focus on a multi-step, human-robot interaction task: **"Making Coffee."** This task is chosen because it inherently involves several complex sub-tasks, multimodal perception, and sophisticated manipulation, making it an excellent demonstration of an integrated Vision-Language-Action (VLA) system with a humanoid robot.

### Why "Make Coffee"?

-   **Multi-step and Sequential**: The task requires a sequence of actions:
    1.  Locate coffee mug.
    2.  Grasp coffee mug.
    3.  Locate coffee machine.
    4.  Place mug under coffee dispenser.
    5.  Activate coffee machine.
    6.  Wait for coffee to brew.
    7.  Retrieve coffee mug.
    8.  Serve coffee (optional, but demonstrates delivery).
-   **Object Recognition and Localization**: Requires identifying specific objects (mug, coffee machine) in a potentially cluttered environment.
-   **Manipulation**: Involves precise grasping and placing of objects.
-   **Human-Robot Interaction**: Can incorporate natural language instructions (e.g., "Make me a coffee," "Where is the mug?").
-   **Environment Interaction**: Interacting with a coffee machine (pressing a button).
-   **State Estimation**: The robot needs to know if the mug is empty, if coffee is brewing, etc.

### Task Breakdown and High-Level Plan

The robot will operate in a simulated kitchen environment. Given the instruction "Make me a coffee," the VLA-powered humanoid robot will:

1.  **Perceive**: Use its vision system (simulated cameras) to identify key objects: coffee mug, coffee machine, and their current locations.
2.  **Understand**: Interpret the human's instruction via its language model.
3.  **Plan**: Generate a sequence of actions required to fulfill the "make coffee" command. This could involve an internal planner or a learned policy from a VLA.
4.  **Execute**: Perform the planned actions through its control system:
    -   Navigate to the table.
    -   Locate and grasp the coffee mug.
    -   Navigate to the coffee machine.
    -   Place the mug under the dispenser.
    -   Activate the coffee machine.
    -   Wait for brewing.
    -   Retrieve the filled mug.
    -   (Optional) Present the mug to the human or place it at a designated serving area.

This task provides a rich problem space to integrate all the concepts learned in the previous modules (ROS 2 for communication, Gazebo/Isaac Sim for digital twin, Isaac Gym/Orbit for robust control, and VLAs for intelligent decision-making).

## Designing the Humanoid Robot's URDF and Required Sensors

For a complex task like "making coffee," the humanoid robot needs a robust physical description (URDF) and a comprehensive sensor suite to perceive its environment effectively.

### Humanoid URDF Considerations

Given the task, the humanoid URDF (or a similar description format like USD for Isaac Sim) should feature:

1.  **Mobile Base**: To navigate the kitchen environment. This implies legs with sufficient degrees of freedom (DOFs) for bipedal locomotion, as taught in the Isaac Orbit module.
2.  **Torso and Arms**:
    -   **Arms**: At least 6-7 DOFs per arm for dexterous manipulation (reaching for mugs, operating buttons). The arms should have a good reach and flexibility.
    -   **Torso/Waist**: Additional DOFs in the torso can provide greater reach and improve manipulation capabilities without excessive arm movements.
3.  **End-Effectors (Hands/Grippers)**:
    -   A multi-fingered hand or a parallel-jaw gripper capable of securely grasping objects of various shapes (e.g., coffee mugs, coffee pot handles).
    -   Force/torque sensors at the fingertips or wrist can provide valuable feedback for stable grasping.
4.  **Head/Neck**:
    -   At least 2-3 DOFs for a head/neck joint to articulate and position cameras for optimal viewing angles.
    -   This allows the robot to "look around" independently of its body movement.

### Required Sensor Suite

The "make coffee" task demands a range of sensors for perception, localization, and manipulation. All these will be simulated within Isaac Sim.

1.  **Vision Sensors**:
    -   **RGB-D Cameras (Stereo or RGB + Depth)**:
        -   **Location**: Strategically placed on the robot's head (for general scene understanding and navigation), and on the wrist (for close-up manipulation and object interaction).
        -   **Purpose**:
            -   **Object Recognition**: Identifying coffee mugs, coffee machine buttons, and other kitchen items.
            -   **Object Localization**: Estimating 3D positions of objects for reaching and grasping.
            -   **Scene Understanding**: Mapping the kitchen layout.
            -   **Human Interaction**: Potentially recognizing human gestures or presence.
    -   **High-Resolution RGB Camera**: For tasks requiring fine visual detail, such as reading text on a coffee machine display or identifying specific coffee types.

2.  **Ranging Sensors**:
    -   **LiDAR (2D or 3D)**:
        -   **Location**: On the torso or base for environmental mapping and obstacle avoidance.
        -   **Purpose**:
            -   **SLAM (Simultaneous Localization and Mapping)**: Building a map of the kitchen and localizing the robot within it.
            -   **Obstacle Avoidance**: Detecting dynamic obstacles (e.g., a human walking by).
            -   **Navigation**: Providing data for path planning.

3.  **Proprioceptive Sensors**:
    -   **IMU (Inertial Measurement Unit)**:
        -   **Location**: On the torso, head, and potentially end-effectors.
        -   **Purpose**:
            -   **Balance and Stabilization**: Essential for bipedal locomotion, providing orientation and angular velocity feedback.
            -   **Motion Estimation**: Tracking robot movement and orientation.
    -   **Joint Encoders**:
        -   **Location**: On all actuated joints.
        -   **Purpose**: Providing precise feedback on joint positions and velocities for accurate control and kinematics.
    -   **Force/Torque Sensors**:
        -   **Location**: At the wrists and fingertips.
        -   **Purpose**:
            -   **Grasping**: Detecting contact and applying appropriate grip force.
            -   **Manipulation**: Sensing interaction forces with objects and the environment (e.g., pressing buttons, detecting resistance when placing a mug).

This sensor suite, combined with a well-designed URDF, provides the foundational hardware capabilities for the humanoid robot to successfully execute the "make coffee" task in a simulated environment.

## Outlining the Complete Software Architecture: From ROS 2 Nodes to the VLA Brain

The software architecture for our humanoid robot's "make coffee" capstone project is a hierarchical, modular system integrating components from ROS 2 for low-level control and communication, Gazebo/Isaac Sim for simulation, and advanced VLA models for high-level intelligence and decision-making.

### High-Level Architecture Overview

The architecture can be conceptualized in layers:

1.  **Perception Layer**: Processes raw sensor data to build an understanding of the environment.
2.  **Cognition/VLA Layer**: Integrates perception with language understanding and task planning to make high-level decisions.
3.  **Action/Control Layer**: Translates high-level decisions into low-level robot movements.
4.  **Simulation Layer**: Provides the virtual environment and physics for robot interaction.

### Detailed Component Breakdown

#### 1. Simulation Layer (Isaac Sim / Gazebo)

-   **Purpose**: Provides the virtual environment, robot model (URDF/USD), physics simulation, and realistic sensor data generation.
-   **Key Components**:
    -   **Isaac Sim**: The primary simulator, hosting the humanoid robot, kitchen environment (table, coffee machine, mug, bin), and generating realistic RGB-D, LiDAR, and IMU data.
    -   **Gazebo ROS 2 Control**: Used for low-level joint control of the robot within Isaac Sim, interfacing with ROS 2 controllers.

#### 2. ROS 2 Communication Layer

-   **Purpose**: Provides a standardized communication framework for all robot software components, acting as the "nervous system."
-   **Key Components**:
    -   **`ros_gz_bridge`**: Bridges sensor data from Isaac Sim's Ignition Transport to ROS 2 topics and control commands from ROS 2 topics to Isaac Sim.
    -   **ROS 2 Topics**: For publishing sensor data (e.g., `/camera/image_raw`, `/scan`, `/imu/data`, `/joint_states`) and subscribing to control commands (e.g., `/joint_trajectory_controller/joint_trajectory`, `/cmd_vel`).
    -   **ROS 2 Services/Actions**: For high-level requests (e.g., path planning requests, grasping actions).

#### 3. Perception Layer (ROS 2 Nodes)

-   **Purpose**: Converts raw sensor data into meaningful information for the VLA.
-   **Key Components**:
    -   **Camera Driver Node**: Publishes `sensor_msgs/Image` and `sensor_msgs/CameraInfo` from simulated cameras.
    -   **LiDAR Driver Node**: Publishes `sensor_msgs/LaserScan` or `sensor_msgs/PointCloud2`.
    -   **IMU Driver Node**: Publishes `sensor_msgs/Imu`.
    -   **Object Detection & Pose Estimation Node**:
        -   **Input**: RGB-D images.
        -   **Output**: `perception_msgs/ObjectDetection` (custom message) containing bounding boxes, class labels (mug, coffee machine), and 6D poses of detected objects. This node would likely use a fine-tuned vision model from the VLA's vision encoder.
    -   **SLAM/Navigation Stack Node**:
        -   **Input**: LiDAR, IMU, odometry.
        -   **Output**: Robot's localized pose (`geometry_msgs/PoseStamped`), environmental map (`nav_msgs/OccupancyGrid`).

#### 4. Cognition/VLA Layer (Python Script/ROS 2 Node)

-   **Purpose**: The "brain" of the robot, combining visual perception with language understanding to generate high-level plans and actions.
-   **Key Components**:
    -   **VLA Model (Python)**: The core VLA (e.g., a fine-tuned RT-1 or a custom architecture integrating CLIP, LLM, and action decoder).
        -   **Input**:
            -   Visual context: Features/embeddings from the Perception Layer's object detection node (e.g., `ObjectDetection` messages, or raw images).
            -   Language instruction: Natural language command (e.g., "Make me a coffee").
        -   **Output**: High-level action sequence or direct control commands.
    -   **Task Planner (Python/C++)**:
        -   **Input**: VLA's high-level action suggestions, current robot state, environment state.
        -   **Output**: A sequence of executable sub-goals (e.g., "move_to_mug," "grasp_mug," "move_to_coffee_machine"). This could be rule-based or learned.
    -   **State Machine/Behavior Tree**: Manages the execution flow of sub-goals and handles transitions based on task progress and sensor feedback.

#### 5. Action/Control Layer (ROS 2 Nodes)

-   **Purpose**: Executes the VLA's decisions and task plans by sending low-level commands to the robot.
-   **Key Components**:
    -   **Motion Planning Node**:
        -   **Input**: Target object poses, target navigation goals from the Task Planner.
        -   **Output**: Collision-free trajectories (joint trajectories, end-effector paths). Uses inverse kinematics (IK) for arm movements.
    -   **Joint Trajectory Controller Node**:
        -   **Input**: Joint trajectories from Motion Planning.
        -   **Output**: Publishes `trajectory_msgs/JointTrajectory` messages to Gazebo ROS 2 Control (via `ros_gz_bridge`).
    -   **Navigation Control Node**:
        -   **Input**: Navigation goals (x, y, yaw) from the Task Planner.
        -   **Output**: Publishes `geometry_msgs/Twist` commands to the robot's base controller (via `ros_gz_bridge`).
    -   **Gripper Control Node**:
        -   **Input**: Grasp/release commands from the Task Planner.
        -   **Output**: Publishes commands to the robot's gripper (e.g., opening/closing force or position).

### Data Flow Diagram (Conceptual)

```
+-------------------+      +-------------------+
|  Human User       |      |  NVIDIA Isaac Sim |
|  (Instructions)   |      |  (Kitchen Env,     |
+---------+---------+      |  Humanoid Robot,  |
          |                  |  Physics, Sensors) |
          | Natural Language |  ^                ^
          v                  |  | ros_gz_bridge  |
+---------+---------+      |  v                | ROS 2 topics
|  ROS 2 VLA Brain  |      |                   |
| (Python Node)     |<----->| ROS 2 Control     | (simulated)
| +-----------------+      |  (Joint Cmds,     |
| | VLA Model       |      |   Sensor Data)    |
| | (Vision Encoder,|      +---------+---------+
| |  Language Model,|                |
| |  Action Decoder)|<--------------------------+
| +-----------------+ Visual/Lang  ^
| | Task Planner    | Input/Output |
| | (Behavior Tree/ |              |
| | State Machine)  |<------------>| Perception Nodes
| +-----------------+ Control Cmds ^ (Obj Detection, SLAM)
+---------+---------+              |
          | Low-level Control      | ROS 2 topics
          v                        v
+---------+------------------------+
|  Robot Hardware Interface       |
|  (Joint Controllers, Gripper)   |
+---------------------------------+
```

This comprehensive software architecture ensures that the humanoid robot can perceive its environment, understand human commands, plan multi-step actions, and execute them effectively within the simulated "make coffee" task. Each module leverages the concepts and tools explored throughout the textbook, demonstrating a fully integrated AI-robot system.