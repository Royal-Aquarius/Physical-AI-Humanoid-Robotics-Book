---
sidebar_position: 4
---

# Building a Robot Model in URDF

This chapter details the process of creating a robot's physical description using the Unified Robot Description Format (URDF).

## Subtasks:

-   Explain the `<link>` and `<joint>` elements for defining the robot's body and articulations.
-   Document how to add collision and visual properties.
-   Provide an example URDF for a simple robotic arm.

## Understanding `<link>` and `<joint>` Elements

In URDF, a robot is described as a collection of rigid bodies (links) connected by joints.

### The `<link>` Element

A `<link>` element defines a rigid body of the robot. It has properties such as:

-   **`inertial`**: Describes the mass, center of mass, and inertia matrix of the link. This is crucial for physics simulations.
    ```xml
    <inertial>
      <mass value="0.5"/>
      <origin xyz="0 0 0.05"/>
      <inertia ixx="0.001" ixy="0" ixz="0" iyy="0.001" iyz="0" izz="0.001"/>
    </inertial>
    ```
-   **`visual`**: Describes the visual properties of the link, such as its geometry (e.g., box, cylinder, sphere, mesh) and material (color). This is what you see in a simulator.
    ```xml
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.1 0.1 0.1"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    ```
-   **`collision`**: Describes the collision properties of the link. This defines how the link interacts physically with other objects in the environment. It can have a different geometry than the visual representation for simplification.
    ```xml
    <collision>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.1 0.1 0.1"/>
      </geometry>
    </collision>
    ```

### The `<joint>` Element

A `<joint>` element defines the connection between two links. It specifies how the child link can move relative to the parent link. Key attributes and elements include:

-   **`name`**: A unique name for the joint.
-   **`type`**: The type of joint (e.g., `revolute`, `continuous`, `prismatic`, `fixed`, `floating`, `planar`).
    -   `revolute`: A rotating joint with a limited range.
    -   `continuous`: A rotating joint with an unlimited range.
    -   `prismatic`: A sliding joint along an axis.
    -   `fixed`: A rigid connection, no movement.
-   **`parent`**: The name of the parent link.
-   **`child`**: The name of the child link.
-   **`origin`**: The transform from the parent link's origin to the child link's origin.
-   **`axis`**: The axis of motion for `revolute`, `continuous`, and `prismatic` joints.
-   **`limit`**: For `revolute` and `prismatic` joints, defines the upper and lower limits of motion, as well as velocity and effort limits.

```xml
<joint name="base_to_link1" type="revolute">
  <parent link="base_link"/>
  <child link="link1"/>
  <origin xyz="0 0 0.1" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-1.57" upper="1.57" velocity="1.0" effort="100"/>
</joint>
```

## Collision and Visual Properties

As seen in the `<link>` element description, `<visual>` and `<collision>` elements are used to define the appearance and physical interaction of a robot's link.

-   **`<visual>`**: This element defines the graphical representation of the link. It's what you typically see in a simulator. You can specify the geometry (e.g., box, cylinder, sphere, mesh) and the material (color, texture) of the link.
    -   Example:
        ```xml
        <visual>
          <origin xyz="0 0 0" rpy="0 0 0"/>
          <geometry>
            <cylinder radius="0.05" length="0.2"/>
          </geometry>
          <material name="green">
            <color rgba="0 1 0 1"/>
          </material>
        </visual>
        ```

-   **`<collision>`**: This element defines the physical properties of the link for collision detection and physics simulation. Often, a simplified geometry is used for collision to reduce computational load, even if the visual geometry is more complex.
    -   Example:
        ```xml
        <collision>
          <origin xyz="0 0 0" rpy="0 0 0"/>
          <geometry>
            <cylinder radius="0.05" length="0.2"/>
          </geometry>
        </collision>
        ```
    It's important to note that if no `<collision>` element is specified, the `<visual>` geometry is often used for collision by default, which might be computationally expensive.

## Example URDF for a Simple Robotic Arm

Here's a complete URDF example for a simple two-link robotic arm:

```xml
<?xml version="1.0"?>
<robot name="simple_arm">

  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.1 0.1 0.1"/>
      </geometry>
      <material name="red">
        <color rgba="1 0 0 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.1 0.1 0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="0.1"/>
      <origin xyz="0 0 0"/>
      <inertia ixx="0.0001" ixy="0" ixz="0" iyy="0.0001" iyz="0" izz="0.0001"/>
    </inertial>
  </link>

  <link name="link1">
    <visual>
      <origin xyz="0 0 0.15" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.02" length="0.3"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0.15" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.02" length="0.3"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="0.05"/>
      <origin xyz="0 0 0.15"/>
      <inertia ixx="0.00001" ixy="0" ixz="0" iyy="0.00001" iyz="0" izz="0.000001"/>
    </inertial>
  </link>

  <joint name="joint1" type="revolute">
    <parent link="base_link"/>
    <child link="link1"/>
    <origin xyz="0 0 0.05" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" velocity="0.5" effort="1.0"/>
  </joint>

  <link name="link2">
    <visual>
      <origin xyz="0 0 0.15" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.02" length="0.3"/>
      </geometry>
      <material name="green">
        <color rgba="0 1 0 1"/>
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0.15" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.02" length="0.3"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="0.05"/>
      <origin xyz="0 0 0.15"/>
      <inertia ixx="0.00001" ixy="0" ixz="0" iyy="0.00001" iyz="0" izz="0.000001"/>
    </inertial>
  </link>

  <joint name="joint2" type="revolute">
    <parent link="link1"/>
    <child link="link2"/>
    <origin xyz="0 0 0.3" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" velocity="0.5" effort="1.0"/>
  </joint>

</robot>
```
