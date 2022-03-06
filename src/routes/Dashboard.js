import { useAuthState } from "../firebase";
function Dashboard() {
  const state = useAuthState();
  console.log(state);
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Dashboard this page should require auth
        {state.user.displayName}
      </div>
    </div>
  );
}
export default Dashboard;
