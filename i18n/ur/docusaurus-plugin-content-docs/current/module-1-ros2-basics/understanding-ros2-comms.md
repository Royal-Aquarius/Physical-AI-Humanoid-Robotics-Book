---
sidebar_position: 3
---

# Understanding ROS 2 Topics, Services, and Actions

This chapter provides an in-depth look at the primary communication patterns in ROS 2: Topics, Services, and Actions.

## Subtasks:

-   **Topics**: Write a guide on creating custom message types and using them for continuous data streams (e.g., sensor data).
    *   Custom Message Types:
        While ROS 2 provides standard message types (like `std_msgs/msg/String`), you'll often need custom messages to exchange specific data structures. Custom messages are defined in `.msg` files within a package's `msg` directory.

        Let's create a custom message called `MyCustomMessage`. In your `my_package`, create a `msg` directory: `my_package/msg/MyCustomMessage.msg`
        ```
        int32 id
        string name
        float32 value
        ```
        Then, you need to update `package.xml` and `CMakeLists.txt` to tell ROS 2 about your custom message.
        In `package.xml`, add:
        ```xml
        <build_depend>rosidl_default_generators</build_depend>
        <exec_depend>rosidl_default_runtime</exec_depend>
        <member_of_group>rosidl_interface_packages</member_of_group>
        ```
        In `CMakeLists.txt`, add:
        ```cmake
        find_package(rosidl_default_generators REQUIRED)
        rosidl_generate_interfaces(${PROJECT_NAME}
          "msg/MyCustomMessage.msg"
        )
        ```
        After these changes, rebuild your workspace (`colcon build`).

    *   Using Custom Messages:
        Once built, your custom message can be imported and used in your Python or C++ nodes just like any other ROS 2 message type.

        **Publisher using custom message:**
        ```python
        import rclpy
        from rclpy.node import Node
        from my_package.msg import MyCustomMessage # Import your custom message

        class CustomPublisher(Node):
            def __init__(self):
                super().__init__('custom_publisher')
                self.publisher_ = self.create_publisher(MyCustomMessage, 'custom_topic', 10)
                self.timer = self.create_timer(1.0, self.timer_callback)
                self.msg_id = 0

            def timer_callback(self):
                msg = MyCustomMessage()
                msg.id = self.msg_id
                msg.name = f"Data {self.msg_id}"
                msg.value = float(self.msg_id * 100)
                self.publisher_.publish(msg)
                self.get_logger().info(f'Publishing: id={msg.id}, name={msg.name}, value={msg.value}')
                self.msg_id += 1

        def main(args=None):
            rclpy.init(args=args)
            node = CustomPublisher()
            rclpy.spin(node)
            node.destroy_node()
            rclpy.shutdown()

        if __name__ == '__main__':
            main()
        ```

        **Subscriber using custom message:**
        ```python
        import rclpy
        from rclpy.node import Node
        from my_package.msg import MyCustomMessage # Import your custom message

        class CustomSubscriber(Node):
            def __init__(self):
                super().__init__('custom_subscriber')
                self.subscription = self.create_subscription(
                    MyCustomMessage,
                    'custom_topic',
                    self.listener_callback,
                    10
                )
                self.subscription # prevent unused variable warning

            def listener_callback(self, msg):
                self.get_logger().info(f'I heard: id={msg.id}, name={msg.name}, value={msg.value}')

        def main(args=None):
            rclpy.init(args=args)
            node = CustomSubscriber()
            rclpy.spin(node)
            node.destroy_node()
            rclpy.shutdown()

        if __name__ == '__main__':
            main()
        ```

-   **Services**: Develop a tutorial for request/response interactions (e.g., triggering a camera snapshot).
    *   Defining a Service:
        Services are defined using `.srv` files. Let's create a service called `AddTwoInts` that takes two integers and returns their sum.
        In your `my_package/srv` directory, create `AddTwoInts.srv`:
        ```
        int64 a
        int64 b
        ---
        int64 sum
        ```
        Similar to messages, you need to update `package.xml` and `CMakeLists.txt`.
        In `package.xml`, ensure `rosidl_default_generators` is in `build_depend` and `rosidl_default_runtime` in `exec_depend`.

        In `CMakeLists.txt`, add:
        ```cmake
        rosidl_generate_interfaces(${PROJECT_NAME}
          "srv/AddTwoInts.srv"
        )
        ```
        Rebuild your workspace (`colcon build`).

    *   Implementing a Service Server:
        The service server provides the functionality defined by the `.srv` file.

        **Service Server (Python):**
        ```python
        import rclpy
        from rclpy.node import Node
        from my_package.srv import AddTwoInts # Import your custom service

        class MinimalService(Node):

            def __init__(self):
                super().__init__('minimal_service')
                self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

            def add_two_ints_callback(self, request, response):
                response.sum = request.a + request.b
                self.get_logger().info(f'Incoming request: a={request.a} b={request.b}')
                self.get_logger().info(f'Sending back response: {response.sum}')
                return response

        def main(args=None):
            rclpy.init(args=args)
            minimal_service = MinimalService()
            rclpy.spin(minimal_service)
            minimal_service.destroy_node()
            rclpy.shutdown()

        if __name__ == '__main__':
            main()
        ```
        Remember to add this to `setup.py` and rebuild.

    *   Implementing a Service Client:
        The service client sends requests to the service server and waits for a response.

        **Service Client (Python):**
        ```python
        import sys
        import rclpy
        from rclpy.node import Node
        from my_package.srv import AddTwoInts # Import your custom service

        class MinimalClientAsync(Node):

            def __init__(self):
                super().__init__('minimal_client_async')
                self.cli = self.create_client(AddTwoInts, 'add_two_ints')
                while not self.cli.wait_for_service(timeout_sec=1.0):
                    self.get_logger().info('service not available, waiting again...')
                self.req = AddTwoInts.Request()

            def send_request(self, a, b):
                self.req.a = a
                self.req.b = b
                self.future = self.cli.call_async(self.req)
                rclpy.spin_until_future_complete(self, self.future)
                return self.future.result()

        def main(args=None):
            rclpy.init(args=args)
            minimal_client = MinimalClientAsync()
            response = minimal_client.send_request(int(sys.argv[1]), int(sys.argv[2]))
            minimal_client.get_logger().info(
                f'Result of add_two_ints: for {sys.argv[1]} + {sys.argv[2]} = {response.sum}')
            minimal_client.destroy_node()
            rclpy.shutdown()

        if __name__ == '__main__':
            main()
        ```
        Remember to add this to `setup.py` and rebuild.
        To run: `ros2 run my_package minimal_client_async 2 3`

-   **Actions**: Create a guide for long-running, goal-oriented tasks with feedback (e.g., telling a robot to move to a specific coordinate).
    *   Defining an Action:
        Actions are defined using `.action` files. They consist of three parts: Goal, Result, and Feedback. Let's create a simple action `Fibonacci` that computes a Fibonacci sequence up to a certain order.
        In your `my_package/action` directory, create `Fibonacci.action`:
        ```
        # Goal
        int32 order
        ---
        # Result
        int32[] sequence
        ---
        # Feedback
        int32[] partial_sequence
        ```
        Similar to messages and services, you need to update `package.xml` and `CMakeLists.txt`.
        In `package.xml`, ensure `rosidl_default_generators` is in `build_depend` and `rosidl_default_runtime` in `exec_depend`.

        In `CMakeLists.txt`, add:
        ```cmake
        rosidl_generate_interfaces(${PROJECT_NAME}
          "action/Fibonacci.action"
        )
        ```
        Rebuild your workspace (`colcon build`).

    *   Implementing an Action Server:
        The action server executes the goal and provides feedback to the client.

        **Action Server (Python):**
        ```python
        import time
        import rclpy
        from rclpy.action import ActionServer, CancelResponse, GoalResponse
        from rclpy.node import Node
        from my_package.action import Fibonacci # Import your custom action

        class MinimalActionServer(Node):

            def __init__(self):
                super().__init__('minimal_action_server')
                self._action_server = ActionServer(
                    self,
                    Fibonacci,
                    'fibonacci',
                    self.execute_callback,
                    goal_callback=self.goal_callback,
                    cancel_callback=self.cancel_callback)

            def goal_callback(self, goal_handle):
                self.get_logger().info('Received goal request')
                return GoalResponse.ACCEPT

            def cancel_callback(self, goal_handle):
                self.get_logger().info('Received cancel request')
                return CancelResponse.ACCEPT

            async def execute_callback(self, goal_handle):
                self.get_logger().info('Executing goal...')

                sequence = [0, 1]
                feedback_msg = Fibonacci.Feedback()
                
                for i in range(1, goal_handle.request.order):
                    if goal_handle.is_cancel_requested:
                        goal_handle.canceled()
                        self.get_logger().info('Goal canceled')
                        return Fibonacci.Result()

                    sequence.append(sequence[i] + sequence[i-1])
                    feedback_msg.partial_sequence = sequence
                    goal_handle.publish_feedback(feedback_msg)
                    self.get_logger().info('Publishing feedback: {0}'.format(feedback_msg.partial_sequence))
                    time.sleep(1) # Simulate work

                goal_handle.succeed()
                result = Fibonacci.Result()
                result.sequence = sequence
                self.get_logger().info('Goal succeeded')
                return result

        def main(args=None):
            rclpy.init(args=args)
            minimal_action_server = MinimalActionServer()
            rclpy.spin(minimal_action_server)

        if __name__ == '__main__':
            main()
        ```
        Remember to add this to `setup.py` and rebuild.

    *   Implementing an Action Client:
        The action client sends goals to the action server and receives feedback and results.

        **Action Client (Python):**
        ```python
        import rclpy
        from rclpy.action import ActionClient
        from rclpy.node import Node
        from my_package.action import Fibonacci # Import your custom action

        class MinimalActionClient(Node):

            def __init__(self):
                super().__init__('minimal_action_client')
                self._action_client = ActionClient(self, Fibonacci, 'fibonacci')

            def send_goal(self, order):
                self.get_logger().info('Waiting for action server...')
                self._action_client.wait_for_server()

                goal_msg = Fibonacci.Goal()
                goal_msg.order = order

                self.get_logger().info('Sending goal request...')
                self._send_goal_future = self._action_client.send_goal_async(goal_msg, feedback_callback=self.feedback_callback)
                self._send_goal_future.add_done_callback(self.goal_response_callback)

            def goal_response_callback(self, future):
                goal_handle = future.result()
                if not goal_handle.accepted:
                    self.get_logger().info('Goal rejected :(')
                    return

                self.get_logger().info('Goal accepted :)')
                self._get_result_future = goal_handle.get_result_async()
                self._get_result_future.add_done_callback(self.get_result_callback)

            def get_result_callback(self, future):
                result = future.result().result
                self.get_logger().info('Result: {0}'.format(result.sequence))
                rclpy.shutdown()

            def feedback_callback(self, feedback_msg):
                self.get_logger().info('Received feedback: {0}'.format(feedback_msg.partial_sequence))

        def main(args=None):
            rclpy.init(args=args)
            action_client = MinimalActionClient()
            action_client.send_goal(10) # Request Fibonacci sequence up to order 10
            rclpy.spin(action_client)

        if __name__ == '__main__':
            main()
        ```
        Remember to add this to `setup.py` and rebuild.
        Run the server in one terminal, then the client in another.