import LoginForm from "@/components/LoginForm";

const Home = () => {
  return (
    <div>
      <main className="bg-blue-500">
        <h1 className="text-blue-500">Welcome to my Next.js App</h1>
        <LoginForm />
      </main>
    </div>
  );
};

export default Home;
