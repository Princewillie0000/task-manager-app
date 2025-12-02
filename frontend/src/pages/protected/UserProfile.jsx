import Navbar from "../../components/ui/Navbar";
import AddTasks from "../../components/AddTasks";
import DisplayUserTasks from "../../components/DisplayUserTasks";

const UserProfile = () => {
  return (
    <section className=" h-full bg-blue-950 ">
      <Navbar />
      <div className="w-[1300px] shadow-md grid grid-cols-1 container mx-auto pt-16">
        <h1 className="text-3xl font-bold text-gray-500 text-center bg-white mb-5 py-2 rounded-md ">
          My Task App
        </h1>

        <AddTasks />
        <DisplayUserTasks />
      </div>
    </section>
  );
};

export default UserProfile;
