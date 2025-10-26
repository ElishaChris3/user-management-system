import UserForm from "@/components/UserForm";

export default function NewUserPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Add new user</h1>
      <UserForm mode="create" />
    </div>
  );
}
