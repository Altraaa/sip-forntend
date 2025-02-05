import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import FormLayout from "../../layouts/FormLayout";
import { ITask } from "@/utils/models/Tasks";
import { useTaskCreate } from "@/utils/hooks/useTask";
import { useSubjects } from "@/utils/hooks/useSubject";
import Loading from "@/ui/components/SharedCompoent/Loading";

const ViewAddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<
    string | number | null
  >(null);
  const [dueDate, setDueDate] = useState("");
  const [priority, _setPriority] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch subjects using useQuery
  const {
    data: subjects,
    isLoading: isLoadingSubjects,
    error: subjectsError,
  } = useSubjects();

  // Create Task mutation using useTaskCreate hook
  const { mutate: createTask } = useTaskCreate();

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

      // Prepare task data
      const newTask: ITask = {
        id: 0, // or omit if auto-generated
        title: taskTitle,
        description: taskDescription,
        student_id: 1!, // Use student_id from the hook
        subject_id: Number(selectedSubject),
        due_date: dueDate,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Call create task API
      createTask(newTask);
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  if (subjectsError) {
    return <div>Error loading subjects.</div>;
  }

  return (
    <MainLayout title="Add Task">
      <Loading open={isLoadingSubjects} />
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
                options: subjects?.map(
                  (subject: { id: number; name: string }) => ({
                    value: subject.id,
                    label: subject.name,
                  })
                ),
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
                type: "textarea",
                rows: 4,
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

export default ViewAddTask;
