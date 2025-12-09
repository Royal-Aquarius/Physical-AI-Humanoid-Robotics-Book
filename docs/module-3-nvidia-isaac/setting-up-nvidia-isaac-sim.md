---
sidebar_position: 1
---

# Setting up NVIDIA Isaac Sim

This chapter provides an introductory guide to installing and running Isaac Sim.

## Subtasks:

-   Document the system requirements and installation procedure.
-   Provide a tour of the Isaac Sim UI and its core features.
-   Create a "Hello, World!" example of loading and manipulating an object in Isaac Sim.

## System Requirements and Installation Procedure

NVIDIA Isaac Sim is built on the Omniverse platform and requires a capable NVIDIA GPU and specific software configurations.

### System Requirements

Before installing Isaac Sim, ensure your system meets the following minimum requirements:

-   **Operating System**:
    -   Ubuntu 20.04 LTS or 22.04 LTS (recommended)
    -   Windows 10/11 (WSL2 with Ubuntu is highly recommended for full functionality)
-   **GPU**:
    -   NVIDIA GeForce RTX 20 Series or higher (RTX 30 Series or 40 Series recommended)
    -   NVIDIA Quadro RTX Series or higher
    -   Minimum 8 GB VRAM (12 GB+ recommended)
-   **CPU**: Intel Core i7 / AMD Ryzen 7 or higher (modern multi-core CPU)
-   **RAM**: 32 GB or more
-   **Storage**: 100 GB SSD free space (NVMe SSD recommended)
-   **Drivers**: Latest NVIDIA GPU drivers (ensure they support CUDA 11.x or higher)
-   **Network**: Stable internet connection for downloads and updates

### Installation Procedure

The installation of Isaac Sim typically involves two main steps: installing NVIDIA Omniverse Launcher and then installing Isaac Sim through the launcher.

1.  **Install NVIDIA Omniverse Launcher**:
    -   Go to the [NVIDIA Omniverse website](https://www.nvidia.com/omniverse/).
    -   Download and install the Omniverse Launcher for your operating system (Windows or Linux).
    -   Follow the on-screen instructions to complete the installation. You may need to create an NVIDIA account if you don't already have one.

2.  **Install Isaac Sim via Omniverse Launcher**:
    -   Launch the NVIDIA Omniverse Launcher.
    -   Navigate to the "Exchange" or "Applications" tab.
    -   Search for "Isaac Sim".
    -   Click on "Install" and follow the prompts. The launcher will download and install all necessary components, including the core Omniverse components and the Isaac Sim application. This can take a significant amount of time due to the large file size.
    -   Once installed, you should see "Isaac Sim" listed under your "Library" or "Installed Apps" section in the launcher.

3.  **Setup and First Launch**:
    -   Before launching for the first time, it's often recommended to check for any available updates in the Omniverse Launcher.
    -   Click the "Launch" button next to Isaac Sim in the launcher.
    -   The first launch might take longer as it sets up necessary caches and configurations.
    -   If prompted, install any required Omniverse extensions or dependencies.

### Post-Installation Checks

-   **Verify GPU Drivers**: Ensure your NVIDIA drivers are up to date. Outdated drivers are a common cause of issues.
-   **Test Sample Scenes**: Once Isaac Sim loads, try opening one of the sample scenes provided (e.g., "Franka_Cabinet.usd") to ensure everything is working correctly.

---
sidebar_position: 1
---

# Setting up NVIDIA Isaac Sim

This chapter provides an introductory guide to installing and running Isaac Sim.

## Subtasks:

-   Document the system requirements and installation procedure.
-   Provide a tour of the Isaac Sim UI and its core features.
-   Create a "Hello, World!" example of loading and manipulating an object in Isaac Sim.

## System Requirements and Installation Procedure

NVIDIA Isaac Sim is built on the Omniverse platform and requires a capable NVIDIA GPU and specific software configurations.

### System Requirements

Before installing Isaac Sim, ensure your system meets the following minimum requirements:

-   **Operating System**:
    -   Ubuntu 20.04 LTS or 22.04 LTS (recommended)
    -   Windows 10/11 (WSL2 with Ubuntu is highly recommended for full functionality)
-   **GPU**:
    -   NVIDIA GeForce RTX 20 Series or higher (RTX 30 Series or 40 Series recommended)
    -   NVIDIA Quadro RTX Series or higher
    -   Minimum 8 GB VRAM (12 GB+ recommended)
-   **CPU**: Intel Core i7 / AMD Ryzen 7 or higher (modern multi-core CPU)
-   **RAM**: 32 GB or more
-   **Storage**: 100 GB SSD free space (NVMe SSD recommended)
-   **Drivers**: Latest NVIDIA GPU drivers (ensure they support CUDA 11.x or higher)
-   **Network**: Stable internet connection for downloads and updates

### Installation Procedure

The installation of Isaac Sim typically involves two main steps: installing NVIDIA Omniverse Launcher and then installing Isaac Sim through the launcher.

1.  **Install NVIDIA Omniverse Launcher**:
    -   Go to the [NVIDIA Omniverse website](https://www.nvidia.com/omniverse/).
    -   Download and install the Omniverse Launcher for your operating system (Windows or Linux).
    -   Follow the on-screen instructions to complete the installation. You may need to create an NVIDIA account if you don't already have one.

2.  **Install Isaac Sim via Omniverse Launcher**:
    -   Launch the NVIDIA Omniverse Launcher.
    -   Navigate to the "Exchange" or "Applications" tab.
    -   Search for "Isaac Sim".
    -   Click on "Install" and follow the prompts. The launcher will download and install all necessary components, including the core Omniverse components and the Isaac Sim application. This can take a significant amount of time due to the large file size.
    -   Once installed, you should see "Isaac Sim" listed under your "Library" or "Installed Apps" section in the launcher.

3.  **Setup and First Launch**:
    -   Before launching for the first time, it's often recommended to check for any available updates in the Omniverse Launcher.
    -   Click the "Launch" button next to Isaac Sim in the launcher.
    -   The first launch might take longer as it sets up necessary caches and configurations.
    -   If prompted, install any required Omniverse extensions or dependencies.

### Post-Installation Checks

-   **Verify GPU Drivers**: Ensure your NVIDIA drivers are up to date. Outdated drivers are a common cause of issues.
-   **Test Sample Scenes**: Once Isaac Sim loads, try opening one of the sample scenes provided (e.g., "Franka_Cabinet.usd") to ensure everything is working correctly.

By following these steps, you should have NVIDIA Isaac Sim successfully installed and ready for use in developing your physical AI and humanoid robotics applications.

## A Tour of the Isaac Sim UI and its Core Features

NVIDIA Isaac Sim's user interface is built upon the Omniverse Kit, offering a powerful and flexible environment for robotics simulation. This section provides an overview of its key components and features.

### Main UI Components

1.  **Viewport**:
    -   The central area where you visualize your 3D scenes, robots, and environments.
    -   Allows for interactive manipulation (pan, zoom, rotate) of the scene.
    -   Displays real-time simulation output, including sensor data (e.g., camera feeds, LiDAR point clouds).

2.  **Stage Window**:
    -   Located typically on the left side, this window displays the hierarchical structure of your scene using the Universal Scene Description (USD) format.
    -   You can select, add, remove, and organize prims (basic building blocks in USD like meshes, lights, cameras, physics objects).

3.  **Property Window (Details Panel)**:
    -   Usually on the right side, this panel shows the properties and attributes of the currently selected prim in the Stage window.
    -   Allows you to modify parameters such as position, rotation, scale, material properties, physics attributes, and sensor settings.

4.  **Content Window**:
    -   Often at the bottom, this window provides access to various assets, including 3D models, materials, environments, and scripts.
    -   You can drag and drop assets directly into your scene.
    -   It also allows you to navigate your project's files and Omniverse Nucleus servers.

5.  **Toolbar and Menus**:
    -   Standard application menus (File, Edit, View, etc.) at the top.
    -   A toolbar with quick access buttons for common operations like play/pause simulation, reset scene, save, and load.
    -   Specific Isaac Sim menus and tools for robotics-related functionalities.

### Core Features for Robotics Simulation

1.  **USD (Universal Scene Description)**:
    -   Isaac Sim leverages USD as its foundational scene description format. This enables powerful scene composition, layering, and collaboration.
    -   Robots, environments, and assets are all represented as USD prims.

2.  **Physics Engine (PhysX)**:
    -   Built-in NVIDIA PhysX 5 for highly realistic and GPU-accelerated physics simulation.
    -   Supports rigid body dynamics, soft body dynamics, joints, collisions, and various constraints.
    -   Enables accurate simulation of robot kinematics and dynamics.

3.  **Sensor Simulation**:
    -   Provides high-fidelity simulation of various sensors:
        -   **RGB-D Cameras**: Simulate realistic camera feeds, depth maps, and segmentation masks.
        -   **LiDAR**: Generate accurate point cloud data.
        -   **IMU**: Simulate inertial measurement units.
        -   **Force/Torque Sensors**: Simulate forces and torques at robot joints.
    -   Configurable sensor parameters for resolution, noise, and field of view.

4.  **ROS/ROS 2 Integration**:
    -   Deep integration with ROS and ROS 2 through Omniverse ROS/ROS 2 bridges and extensions.
    -   Allows you to control robots in Isaac Sim using standard ROS 2 messages and interfaces (e.g., `JointTrajectoryController`, `Twist` commands).
    -   Publishes simulated sensor data to ROS 2 topics for perception and navigation stacks.

5.  **Synthetic Data Generation**:
    -   One of Isaac Sim's most powerful features. It can generate large volumes of diverse, high-quality synthetic data (images, point clouds, labels) for training AI models.
    -   Supports randomization of scene elements, textures, lighting, and camera positions to improve model robustness.
    -   Provides ground truth information (e.g., object poses, segmentation masks) that is impossible to obtain from real-world sensors.

6.  **Robot Libraries and Assets**:
    -   Comes with a rich library of pre-built robot models (e.g., Franka Emika Panda, UR series, ANYmal) and environments.
    -   Easy import of custom robot models (URDF, MJCF) and assets.

7.  **Scripting (Python)**:
    -   Isaac Sim is highly scriptable using Python, allowing users to automate workflows, create complex behaviors, integrate external libraries, and customize almost any aspect of the simulation.
    -   The `omni.isaac.core` and `omni.isaac.ros_bridge` APIs are key for Python scripting.

---
sidebar_position: 1
---

# Setting up NVIDIA Isaac Sim

This chapter provides an introductory guide to installing and running Isaac Sim.

## Subtasks:

-   Document the system requirements and installation procedure.
-   Provide a tour of the Isaac Sim UI and its core features.
-   Create a "Hello, World!" example of loading and manipulating an object in Isaac Sim.

## System Requirements and Installation Procedure

NVIDIA Isaac Sim is built on the Omniverse platform and requires a capable NVIDIA GPU and specific software configurations.

### System Requirements

Before installing Isaac Sim, ensure your system meets the following minimum requirements:

-   **Operating System**:
    -   Ubuntu 20.04 LTS or 22.04 LTS (recommended)
    -   Windows 10/11 (WSL2 with Ubuntu is highly recommended for full functionality)
-   **GPU**:
    -   NVIDIA GeForce RTX 20 Series or higher (RTX 30 Series or 40 Series recommended)
    -   NVIDIA Quadro RTX Series or higher
    -   Minimum 8 GB VRAM (12 GB+ recommended)
-   **CPU**: Intel Core i7 / AMD Ryzen 7 or higher (modern multi-core CPU)
-   **RAM**: 32 GB or more
-   **Storage**: 100 GB SSD free space (NVMe SSD recommended)
-   **Drivers**: Latest NVIDIA GPU drivers (ensure they support CUDA 11.x or higher)
-   **Network**: Stable internet connection for downloads and updates

### Installation Procedure

The installation of Isaac Sim typically involves two main steps: installing NVIDIA Omniverse Launcher and then installing Isaac Sim through the launcher.

1.  **Install NVIDIA Omniverse Launcher**:
    -   Go to the [NVIDIA Omniverse website](https://www.nvidia.com/omniverse/).
    -   Download and install the Omniverse Launcher for your operating system (Windows or Linux).
    -   Follow the on-screen instructions to complete the installation. You may need to create an NVIDIA account if you don't already have one.

2.  **Install Isaac Sim via Omniverse Launcher**:
    -   Launch the NVIDIA Omniverse Launcher.
    -   Navigate to the "Exchange" or "Applications" tab.
    -   Search for "Isaac Sim".
    -   Click on "Install" and follow the prompts. The launcher will download and install all necessary components, including the core Omniverse components and the Isaac Sim application. This can take a significant amount of time due to the large file size.
    -   Once installed, you should see "Isaac Sim" listed under your "Library" or "Installed Apps" section in the launcher.

3.  **Setup and First Launch**:
    -   Before launching for the first time, it's often recommended to check for any available updates in the Omniverse Launcher.
    -   Click the "Launch" button next to Isaac Sim in the launcher.
    -   The first launch might take longer as it sets up necessary caches and configurations.
    -   If prompted, install any required Omniverse extensions or dependencies.

### Post-Installation Checks

-   **Verify GPU Drivers**: Ensure your NVIDIA drivers are up to date. Outdated drivers are a common cause of issues.
-   **Test Sample Scenes**: Once Isaac Sim loads, try opening one of the sample scenes provided (e.g., "Franka_Cabinet.usd") to ensure everything is working correctly.

By following these steps, you should have NVIDIA Isaac Sim successfully installed and ready for use in developing your physical AI and humanoid robotics applications.

## A Tour of the Isaac Sim UI and its Core Features

NVIDIA Isaac Sim's user interface is built upon the Omniverse Kit, offering a powerful and flexible environment for robotics simulation. This section provides an overview of its key components and features.

### Main UI Components

1.  **Viewport**:
    -   The central area where you visualize your 3D scenes, robots, and environments.
    -   Allows for interactive manipulation (pan, zoom, rotate) of the scene.
    -   Displays real-time simulation output, including sensor data (e.g., camera feeds, LiDAR point clouds).

2.  **Stage Window**:
    -   Located typically on the left side, this window displays the hierarchical structure of your scene using the Universal Scene Description (USD) format.
    -   You can select, add, remove, and organize prims (basic building blocks in USD like meshes, lights, cameras, physics objects).

3.  **Property Window (Details Panel)**:
    -   Usually on the right side, this panel shows the properties and attributes of the currently selected prim in the Stage window.
    -   Allows you to modify parameters such as position, rotation, scale, material properties, physics attributes, and sensor settings.

4.  **Content Window**:
    -   Often at the bottom, this window provides access to various assets, including 3D models, materials, environments, and scripts.
    -   You can drag and drop assets directly into your scene.
    -   It also allows you to navigate your project's files and Omniverse Nucleus servers.

5.  **Toolbar and Menus**:
    -   Standard application menus (File, Edit, View, etc.) at the top.
    -   A toolbar with quick access buttons for common operations like play/pause simulation, reset scene, save, and load.
    -   Specific Isaac Sim menus and tools for robotics-related functionalities.

### Core Features for Robotics Simulation

1.  **USD (Universal Scene Description)**:
    -   Isaac Sim leverages USD as its foundational scene description format. This enables powerful scene composition, layering, and collaboration.
    -   Robots, environments, and assets are all represented as USD prims.

2.  **Physics Engine (PhysX)**:
    -   Built-in NVIDIA PhysX 5 for highly realistic and GPU-accelerated physics simulation.
    -   Supports rigid body dynamics, soft body dynamics, joints, collisions, and various constraints.
    -   Enables accurate simulation of robot kinematics and dynamics.

3.  **Sensor Simulation**:
    -   Provides high-fidelity simulation of various sensors:
        -   **RGB-D Cameras**: Simulate realistic camera feeds, depth maps, and segmentation masks.
        -   **LiDAR**: Generate accurate point cloud data.
        -   **IMU**: Simulate inertial measurement units.
        -   **Force/Torque Sensors**: Simulate forces and torques at robot joints.
    -   Configurable sensor parameters for resolution, noise, and field of view.

4.  **ROS/ROS 2 Integration**:
    -   Deep integration with ROS and ROS 2 through Omniverse ROS/ROS 2 bridges and extensions.
    -   Allows you to control robots in Isaac Sim using standard ROS 2 messages and interfaces (e.g., `JointTrajectoryController`, `Twist` commands).
    -   Publishes simulated sensor data to ROS 2 topics for perception and navigation stacks.

5.  **Synthetic Data Generation**:
    -   One of Isaac Sim's most powerful features. It can generate large volumes of diverse, high-quality synthetic data (images, point clouds, labels) for training AI models.
    -   Supports randomization of scene elements, textures, lighting, and camera positions to improve model robustness.
    -   Provides ground truth information (e.g., object poses, segmentation masks) that is impossible to obtain from real-world sensors.

6.  **Robot Libraries and Assets**:
    -   Comes with a rich library of pre-built robot models (e.g., Franka Emika Panda, UR series, ANYmal) and environments.
    -   Easy import of custom robot models (URDF, MJCF) and assets.

7.  **Scripting (Python)**:
    -   Isaac Sim is highly scriptable using Python, allowing users to automate workflows, create complex behaviors, integrate external libraries, and customize almost any aspect of the simulation.
    -   The `omni.isaac.core` and `omni.isaac.ros_bridge` APIs are key for Python scripting.

By understanding these core UI components and features, you can effectively navigate and utilize NVIDIA Isaac Sim for advanced robotics simulation and AI development.

## "Hello, World!" in Isaac Sim: Loading and Manipulating an Object

This example will guide you through creating a simple Python script to load an object into an empty Isaac Sim scene and apply a basic manipulation. This demonstrates the power of Isaac Sim's Python API.

### Prerequisites

-   NVIDIA Isaac Sim installed and accessible.
-   Basic understanding of Python.
-   Access to Isaac Sim's Python environment (e.g., by running the script from within Isaac Sim's Script Editor or by setting up your `PYTHONPATH` correctly).

### Python Script Example

Create a new Python file (e.g., `hello_isaac.py`) and paste the following code:

```python
import omni.isaac.core.utils.nucleus as nucleus_utils
from omni.isaac.core import World
from omni.isaac.core.objects import DynamicCuboid
from pxr import Gf, UsdGeom

# Initialize the World
world = World(stage_units_in_meters=1.0) # Set stage units to meters
world.scene.add_default_ground_plane() # Add a ground plane

# Start the simulation
world.reset()

# Define the path to a USD asset (e.g., a simple cube from Omniverse Nucleus)
# You might need to adjust this path based on your Omniverse Nucleus setup
# A common default for local users is 'omniverse://localhost/NVIDIA/Assets/Shapes/Cube.usd'
cube_asset_path = nucleus_utils.get_nucleus_server() + "/NVIDIA/Assets/Shapes/Cube.usd"

# Try to add a static reference to the USD cube.
# If this fails (e.g. Nucleus is not set up correctly), we will create a dynamic cuboid instead.
try:
    cube_prim_path = "/World/Cube"
    cube_prim = world.scene.add_action_graph_node(
        prim_path=cube_prim_path,
        usd_path=cube_asset_path,
        position=Gf.Vec3d(0.0, 0.0, 1.0),
    )
    print(f"Loaded USD cube from: {cube_asset_path}")
    cube = world.scene.get_object(cube_prim_path) # Get the object to manipulate it
except Exception as e:
    print(f"Could not load USD cube from Nucleus ({e}). Creating a dynamic cuboid instead.")
    # Add a dynamic cuboid (a cube with physics properties)
    cube = world.scene.add(
        DynamicCuboid(
            prim_path="/World/cube",
            name="fancy_cube",
            position=Gf.Vec3d(0.0, 0.0, 1.0), # x, y, z coordinates
            scale=Gf.Vec33d(0.5, 0.5, 0.5), # Scale factor
            color=Gf.Vec3f(0.0, 0.0, 1.0), # Blue color (R, G, B)
        )
    )

# Apply a force to the cube
# Wait a few frames for the physics to settle
world.step(render=True)
world.step(render=True)
world.step(render=True)

print("Applying force to the cube...")
# Apply a force in the x direction
cube.apply_force(Gf.Vec3f(500.0, 0.0, 0.0))

# Run the simulation for a few seconds to observe the effect
for i in range(200): # Simulate for ~3.3 seconds (200 frames at 60 FPS)
    world.step(render=True)
    if i % 50 == 0:
        print(f"Simulation step {i}, cube position: {cube.get_world_pose()[0]}")

print("Simulation finished.")

# Clean up (optional, good practice for longer scripts)
world.clear_instance()
```

### How to Run the Script

1.  **Open Isaac Sim**: Launch Isaac Sim through the Omniverse Launcher.
2.  **Open Script Editor**: Go to `Window -> Script Editor`.
3.  **Load and Run**:
    -   Copy and paste the Python code into the Script Editor.
    -   Click the "Run" button (green play icon).
    -   You should see a blue cube appear in the viewport, and after a few moments, it will be pushed by an applied force.
4.  **Alternative (External Script)**: If you're running the script externally, ensure your Python environment is configured with the Isaac Sim Python API (usually by sourcing `setup_python_env.sh` or `setup_python_env.bat` from your Isaac Sim installation directory). Then execute the script using `python hello_isaac.py`.

This "Hello, World!" example provides a basic foundation for interacting with Isaac Sim programmatically. From here, you can explore more complex scene compositions, robot integrations, and simulation functionalities using the extensive Isaac Sim Python API.
```

### How to Run the Script

1.  **Open Isaac Sim**: Launch Isaac Sim through the Omniverse Launcher.
2.  **Open Script Editor**: Go to `Window -> Script Editor`.
3.  **Load and Run**:
    -   Copy and paste the Python code into the Script Editor.
    -   Click the "Run" button (green play icon).
    -   You should see a blue cube appear in the viewport, and after a few moments, it will be pushed by an applied force.
4.  **Alternative (External Script)**: If you're running the script externally, ensure your Python environment is configured with the Isaac Sim Python API (usually by sourcing `setup_python_env.sh` or `setup_python_env.bat` from your Isaac Sim installation directory). Then execute the script using `python hello_isaac.py`.

This "Hello, World!" example provides a basic foundation for interacting with Isaac Sim programmatically. From here, you can explore more complex scene compositions, robot integrations, and simulation functionalities using the extensive Isaac Sim Python API.

