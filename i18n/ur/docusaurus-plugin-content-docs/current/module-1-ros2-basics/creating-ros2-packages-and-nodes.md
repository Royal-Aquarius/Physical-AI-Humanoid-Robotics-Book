---
sidebar_position: 2
---

# Creating ROS 2 Packages and Nodes

This chapter details the process of structuring and creating a ROS 2 project, including workspaces, packages, and nodes.

## Subtasks:

-   **Document the process of creating a ROS 2 workspace and package.**
    *   ROS 2 Workspace:
        A ROS 2 workspace is a directory that contains one or more ROS 2 packages. It's where you develop, build, and install your ROS 2 code.
        To create a workspace:
        ```bash
        mkdir -p ~/ros2_ws/src
        cd ~/ros2_ws
        colcon build
        ```
        After building, you need to source the setup files from your workspace's `install` directory to make your packages discoverable by ROS 2:
        ```bash
        . install/setup.bash # For Linux/macOS
        # or
        . install/setup.ps1  # For Windows PowerShell
        ```

    *   Creating a Package:
        Packages are the fundamental units of organization in ROS 2. They contain nodes, libraries, configuration files, and other resources.
        To create a new package (e.g., named `my_package` with Python executables and dependencies on `rclpy` and `std_msgs`):
        ```bash
        cd ~/ros2_ws/src
        ros2 pkg create --build-type ament_python my_package --dependencies rclpy std_msgs
        ```
        For a C++ package:
        ```bash
        cd ~/ros2_ws/src
        ros2 pkg create --build-type ament_cmake my_package --dependencies rclcpp std_msgs
        ```
        This command generates a basic package structure with necessary configuration files (`package.xml`, `setup.py` for Python, `CMakeLists.txt` for C++).

-   **Write a tutorial on building a simple C++ or Python node.**
    *   Python Node Example:
        Within your `my_package`, create a new file `my_package/my_package/simple_node.py`:
        ```python
        import rclpy
        from rclpy.node import Node

        def main(args=None):
            rclpy.init(args=args)
            node = Node('simple_python_node')
            node.get_logger().info('Hello from simple_python_node!')
            rclpy.spin_once(node, timeout_sec=1) # spin once to process initialization
            node.destroy_node()
            rclpy.shutdown()

        if __name__ == '__main__':
            main()
        ```
        Remember to make this file executable (`chmod +x simple_node.py`).
        Also, add an entry point in `my_package/setup.py` under `entry_points`:
        ```python
        entry_points={
            'console_scripts': [
                'simple_python_node = my_package.simple_node:main',
            ],
        },
        ```
        Then, from your `ros2_ws` root, run `colcon build` and source the workspace. You can then run your node:
        ```bash
        ros2 run my_package simple_python_node
        ```

    *   C++ Node Example:
        Within your `my_package`, create a new file `my_package/src/simple_node.cpp`:
        ```cpp
        #include "rclcpp/rclcpp.hpp"

        int main(int argc, char * argv[])
        {
          rclcpp::init(argc, argv);
          auto node = rclcpp::Node::make_shared("simple_cpp_node");
          RCLCPP_INFO(node->get_logger(), "Hello from simple_cpp_node!");
          rclcpp::spin_some(node); // spin once to process initialization
          rclcpp::shutdown();
          return 0;
        }
        ```
        You'll also need to modify `my_package/CMakeLists.txt` and `my_package/package.xml`.
        In `CMakeLists.txt`, add:
        ```cmake
        add_executable(simple_cpp_node src/simple_node.cpp)
        ament_target_dependencies(simple_cpp_node rclcpp)
        install(TARGETS simple_cpp_node
          DESTINATION lib/${PROJECT_NAME})
        ```
        In `package.xml`, ensure `rclcpp` is a dependency:
        ```xml
        <depend>rclcpp</depend>
        ```
        Then, from your `ros2_ws` root, run `colcon build` and source the workspace. You can then run your node:
        ```bash
        ros2 run my_package simple_cpp_node
        ```

-   **Explain how to use `launch` files to run multiple nodes.**
    *   Introduction to Launch Files:
        ROS 2 `launch` files are XML or Python files used to start multiple nodes and configure their parameters in a structured way. They are essential for managing complex robotic systems, allowing you to define the startup behavior of your entire application.

    *   Creating a Launch File:
        Let's create a Python launch file in your `my_package` to start both the `minimal_publisher` and `minimal_subscriber` nodes from Task 1.1.

        Create a `launch` directory inside `my_package`, and then create a file `my_package/launch/my_nodes_launch.py`:

        ```python
        from launch import LaunchDescription
        from launch_ros.actions import Node

        def generate_launch_description():
            return LaunchDescription([
                Node(
                    package='my_package',
                    executable='minimal_publisher',
                    name='my_publisher'
                ),
                Node(
                    package='my_package',
                    executable='minimal_subscriber',
                    name='my_subscriber'
                )
            ])
        ```
        In your `my_package/setup.py`, ensure the launch file is installed by adding it to `data_files`:
        ```python
        import os
        from glob import glob
        # ... other imports

        data_files=[
            ('share/ament_index/resource_index/packages',
                ['resource/' + package_name]),
            ('share/' + package_name, ['package.xml']),
            (os.path.join('share', package_name, 'launch'), glob(os.path.join('launch', '*_launch.py'))), # Add this line
        ],
        ```
        After building your workspace (`colcon build`) and sourcing it, you can run the launch file:
        ```bash
        ros2 launch my_package my_nodes_launch.py
        ```
        This will start both the publisher and subscriber nodes, and you should see them communicating.