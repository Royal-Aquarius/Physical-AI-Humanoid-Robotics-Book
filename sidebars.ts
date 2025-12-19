import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * The sidebar configuration that restores the display of all book content
 * with the user-requested labels.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction to Physical AI',
    },
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      link: {
        type: 'generated-index',
        title: 'Module 1: The Robotic Nervous System (ROS 2)',
        description: 'Fundamentals of the Robot Operating System 2.',
      },
      items: [
        'module-1-ros2-basics/introduction-to-ros2',
        'module-1-ros2-basics/creating-ros2-packages-and-nodes',
        'module-1-ros2-basics/understanding-ros2-comms',
        'module-1-ros2-basics/building-a-robot-model-in-urdf',
        'module-1-ros2-basics/launch-files-and-parameters',
        'module-1-ros2-basics/python-agents-with-rclpy',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      link: {
        type: 'generated-index',
        title: 'Module 2: The Digital Twin (Gazebo & Unity)',
        description: 'Simulating robots in virtual environments.',
      },
      items: [
        'module-2-digital-twin/simulating-the-robot-in-gazebo',
        'module-2-digital-twin/integrating-gazebo-with-ros2',
        'module-2-digital-twin/advanced-sensor-simulation',
        'module-2-digital-twin/hri-in-unity',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
      link: {
        type: 'generated-index',
        title: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
        description: 'Advanced simulation and AI with NVIDIA Isaac Sim.',
      },
      items: [
        'module-3-nvidia-isaac/setting-up-nvidia-isaac-sim',
        'module-3-nvidia-isaac/developing-with-isaac-gym-reinforcement-learning',
        'module-3-nvidia-isaac/isaac-orbit-for-humanoid-simulation',
        'module-3-nvidia-isaac/nav2-for-bipeds',
        'module-3-nvidia-isaac/isaac-ros-vslam',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      link: {
        type: 'generated-index',
        title: 'Module 4: Vision-Language-Action (VLA)',
        description: 'Connecting vision and language to robotic actions.',
      },
      items: [
        'module-4-vla/introduction-to-vlas',
        'module-4-vla/implementing-a-simple-vla',
        'module-4-vla/voice-to-action-with-whisper',
        'module-4-vla/cognitive-planning-with-llms',
        'module-4-vla/training-and-fine-tuning-vlas',
      ],
    },
    {
      type: 'category',
      label: 'Capstone Project',
      link: {
        type: 'generated-index',
        title: 'Capstone Project',
        description: 'Applying your knowledge to a final project.',
      },
      items: [
        'capstone-project/project-scoping-and-design',
        'capstone-project/simulation-setup',
        'capstone-project/autonomous-behavior-implementation',
      ],
    },
  ],
};

export default sidebars;
