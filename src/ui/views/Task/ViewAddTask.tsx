import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import FormLayout from "../../layouts/FormLayout";

const ViewTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<
    string | number | null
  >(null);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Contoh data untuk dropdown
  const subjects = [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Biology" },
  ];

  const handleSubmit = async () => {
    try {
      if (
        !taskTitle ||
        !taskDescription ||
        !dueDate ||
        !selectedSubject ||
        !priority
      ) {
        setError("All fields are required.");
        return;
      }

      console.log("Task Submitted:", {
        taskTitle,
        taskDescription,
        selectedSubject,
        dueDate,
        priority,
      });

      // Reset form fields after submission
      setTaskTitle("");
      setTaskDescription("");
      setSelectedSubject(null);
      setDueDate("");
      setPriority(null);
      setError(null);
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <MainLayout title="Add Task">
      <div className="w-full flex justify-center">
        <div className="w-full">
          <FormLayout
            title="Create New Task"
            description="Fill out the details of your new task below."
            fields={[
              {
                label: "Task Title",
                placeholder: "Enter task title",
                type: "text",
                value: taskTitle,
                onChange: setTaskTitle,
                required: true,
              },
              {
                label: "Subject",
                type: "dropdown",
                options: subjects,
                value: selectedSubject,
                onChange: setSelectedSubject,
                required: true,
                placeholder: "Select a subject",
              },
              {
                label: "Due Date",
                placeholder: "Select due date",
                type: "date",
                value: dueDate,
                onChange: setDueDate,
                required: true,
              },
              {
                label: "Task Description",
                placeholder: "Enter task description",
                type: "text",
                value: taskDescription,
                onChange: setTaskDescription,
                required: true,
              },
            ]}
            onSubmit={handleSubmit}
            buttonLabel="Add Task"
            error={error}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewTask;
