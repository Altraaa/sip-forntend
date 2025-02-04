import Card from "@/ui/components/SharedCompoent/Card";
import MainLayout from "../../layouts/MainLayout";
import Button from "@/ui/components/SharedCompoent/Button";
import { SquarePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApiRequest } from "../../../utils/services/Api.service";
const ViewTask = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const fetchUser = async () => {
    try {
      const response = await ApiRequest({ url: "students", method: "GET" });
      const student = response.filter(
        (student: any) => student.nis === localStorage.getItem("username")
      )
      setUser({ name: student[0].name });
    } catch (error: any) {
      console.error("Error fetching user:", error.message || error);
    }
  };

   useEffect(() => {
      fetchUser();

    }, []);
  return (
    <>
      <MainLayout title="List Tasks">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Hi, <span className="text-customColor-oranye">{user?.name}</span>
          </h2>
          <p className="text-gray-600">
            Here's the assignment you didn't finish
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card color="secondary" variant="outlined">
            <div className="flex flex-col gap-5">
              <div className="space-y-1">
                <h1 className="font-semibold">Task 1</h1>
                <h2 className="text-sm">Due date :</h2>
                <p className="text-gray-600 text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  nemo consequatur maxime.
                </p>
              </div>
              <Button
                label="View Detail"
                color="secondary"
                variant="contained"
                className="text-sm"
              />
            </div>
          </Card>
          <Card color="secondary" variant="outlined">
            <div className="flex flex-col gap-5">
              <div className="space-y-1">
                <h1 className="font-semibold">Task 1</h1>
                <h2 className="text-sm">Due date :</h2>
                <p className="text-gray-600 text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  nemo consequatur maxime.
                </p>
              </div>
              <Button
                label="View Detail"
                color="secondary"
                variant="contained"
                className="text-sm"
              />
            </div>
          </Card>
          <Card color="secondary" variant="outlined">
            <div className="flex flex-col gap-5">
              <div className="space-y-1">
                <h1 className="font-semibold">Task 1</h1>
                <h2 className="text-sm">Due date :</h2>
                <p className="text-gray-600 text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  nemo consequatur maxime.
                </p>
              </div>
              <Button
                label="View Detail"
                color="secondary"
                variant="contained"
                className="text-sm"
              />
            </div>
          </Card>
        </div>
        <div className="mt-6 w-full flex justify-end">
          <div>
            <Link
              to="/addtask"
            >
              <Button
                label="Add Task"
                color="secondary"
                variant="outlined"
                endIcon={<SquarePlus size={24} />}
                className="inline-flex items-center"
              />
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ViewTask;
