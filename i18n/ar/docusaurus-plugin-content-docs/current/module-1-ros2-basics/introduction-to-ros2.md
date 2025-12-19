---
sidebar_position: 1
---

# Introduction to ROS 2

This chapter introduces the core concepts of ROS 2, its architecture, and basic communication patterns.

## Subtasks:

-   **Explain the ROS 2 architecture (Nodes, Topics, Services, Actions).**
    *   Nodes: Nodes are executable processes that perform computation. In ROS 2, each node is typically responsible for a single, modular purpose (e.g., a camera driver, a motor controller, a navigation algorithm). Nodes communicate with each other using the communication mechanisms described below.

    *   Topics: Topics are the most common way for nodes to exchange data. They implement a publish-subscribe model, where nodes publish messages to a topic, and other nodes subscribe to that topic to receive the messages. This is a one-to-many, asynchronous communication pattern, ideal for continuous data streams like sensor readings or joint states.

    *   Services: Services provide a request-reply communication model between nodes. A client node sends a request to a service-server node, and the server processes the request and sends back a response. This is a synchronous, one-to-one communication pattern, suitable for operations that require an immediate result, such as triggering an action or querying a specific piece of information.

    *   Actions: Actions are designed for long-running, goal-oriented tasks that may be preempted or require continuous feedback. They extend the service concept by providing status updates during execution and allowing for cancellation. An action client sends a goal to an action server, which provides feedback as it works towards the goal and ultimately returns a result. This is useful for tasks like navigating to a destination or performing complex manipulation sequences.

-   **Detail the installation and setup process for ROS 2 on different platforms.**
    *   Installation on Ubuntu:
        ROS 2 officially supports Ubuntu, making it the recommended platform for development. The installation process typically involves setting up your locale, adding the ROS 2 apt repository, installing `ros-humble-desktop` (or your chosen distribution), and sourcing the setup scripts.
        For detailed, up-to-date instructions, please refer to the [official ROS 2 documentation for Ubuntu](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html).

    *   Installation on Windows:
        While not as natively supported as Ubuntu, ROS 2 can be installed on Windows, often using the Windows Subsystem for Linux (WSL 2) or directly as a native Windows installation. WSL 2 is generally preferred for a more Linux-like development experience.
        Refer to the [official ROS 2 documentation for Windows](https://docs.ros.org/en/humble/Installation/Windows-Install-Binary.html) for detailed steps.

    *   Installation on macOS:
        ROS 2 on macOS is typically installed from source or via Homebrew, though it might require more manual configuration compared to Ubuntu.
        Consult the [official ROS 2 documentation for macOS](https://docs.ros.org/en/humble/Installation/macOS-Install-From-Source.html) for the most current installation guide.

-   **Create a "Hello, World!" example of a ROS 2 publisher and subscriber.**
    *   Publisher example:
        Let's create a simple ROS 2 publisher that sends "Hello, World!" messages.

        First, create a new Python file, e.g., `minimal_publisher.py`:

        ```python
        import rclpy
        from rclpy.node import Node
        from std_msgs.msg import String

        class MinimalPublisher(Node):

            def __init__(self):
                super().__init__('minimal_publisher')
                self.publisher_ = self.create_publisher(String, 'topic', 10)
                timer_period = 0.5  # seconds
                self.timer = self.create_timer(timer_period, self.timer_callback)
                self.i = 0

            def timer_callback(self):
                msg = String()
                msg.data = 'Hello World: %d' % self.i
                self.publisher_.publish(msg)
                self.get_logger().info('Publishing: "%s"' % msg.data)
                self.i += 1

        def main(args=None):
            rclpy.init(args=args)
            minimal_publisher = MinimalPublisher()
            rclpy.spin(minimal_publisher)
            minimal_publisher.destroy_node()
            rclpy.shutdown()

        if __name__ == '__main__':
            main()
        ```

        To run this publisher, save it, ensure it's executable (`chmod +x minimal_publisher.py`), and then execute it:
        ```bash
        python3 minimal_publisher.py
        ```

    *   Subscriber example:
        Now, let's create a corresponding subscriber that receives these messages.

        Create another Python file, e.g., `minimal_subscriber.py`:

        ```python
        import rclpy
        from rclpy.node import Node
        from std_msgs.msg import String

        class MinimalSubscriber(Node):

            def __init__(self):
                super().__init__('minimal_subscriber')
                self.subscription = self.create_subscription(
                    String,
                    'topic',
                    self.listener_callback,
                    10)
                self.subscription  # prevent unused variable warning

            def listener_callback(self, msg):
                self.get_logger().info('I heard: "%s"' % msg.data)

        def main(args=None):
            rclpy.init(args=args)
            minimal_subscriber = MinimalSubscriber()
            rclpy.spin(minimal_subscriber)
            minimal_subscriber.destroy_node()
            rclpy.shutdown()

        if __name__ == '__main__':
            main()
        ```

        To run this subscriber, save it, ensure it's executable, and then execute it in a separate terminal:
        ```bash
        python3 minimal_subscriber.py
        ```
        You should see messages being published by the publisher and received by the subscriber.