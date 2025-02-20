import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import FormLayout from "../../layouts/FormLayout";
import { useTaskCreate } from "@/utils/hooks/useTask";
import { useSubjects } from "@/utils/hooks/useSubject";
import Loading from "@/ui/components/SharedCompoent/Loading";
import ModalConfirmation from "@/ui/components/SharedCompoent/ModalConfirmation";
import { ISubject } from "@/utils/models/Subject";
import { showModernToast } from "@/ui/components/SharedCompoent/ModernToastContainer"; // Import the toast
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const ViewAddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<
    string | number | null
  >(null);
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  // State untuk kontrol modal konfirmasi
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch subjects using useQuery
  const {
    data: subjects,
    isLoading: isLoadingSubjects,
    error: subjectsError,
  } = useSubjects();

  // Create Task mutation using useTaskCreate hook
  const { mutate: createTask } = useTaskCreate();

  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!taskTitle || !taskDescription || !dueDate || !selectedSubject) {
        setError("All fields are required.");
        return;
      }

      // Show confirmation modal before submitting the task
      setIsModalOpen(true);
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      // Call create task API after modal confirmation
      const newTask: any = {
        id: 0, // or omit if auto-generated
        title: taskTitle,
        description: taskDescription,
        student_id: 1!, // Use student_id from the hook
        subject_id: Number(selectedSubject),
        due_date: dueDate,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await createTask(newTask); // Wait for task creation to complete

      showModernToast.success("Task created successfully!"); // Show success toast

      // Redirect to /task page after successful task creation
      navigate("/task");

      setIsModalOpen(false); // Close modal after submit
    } catch (error) {
      showModernToast.error("Error creating task."); // Show error toast if something went wrong
    }
  };

  const handleCancelSubmit = () => {
    setIsModalOpen(false); // Close modal without submitting
  };

  if (subjectsError) {
    return <div>Error loading subjects.</div>;
  }

  const options = subjects
    ? subjects.map((subject: ISubject) => ({
        id: subject.id,
        name: subject.name,
      }))
    : [];

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
                options: options,
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

      {/* Modal Confirmation */}
      <ModalConfirmation
        isOpen={isModalOpen}
        title="Is that correct?"
        message="Are you sure you want to create this task?"
        onClose={handleCancelSubmit}
        onConfirm={handleConfirmSubmit}
        confirmText="Yes"
        color="secondary"
      />
    </MainLayout>
  );
};

export default ViewAddTask;
