export default function Sidebar({ setPage, logout }) {
  return (
    <div style={{ width: 220, background: "#1e293b", color: "white", height: "100vh", padding: 20 }}>
      <h2>Military</h2>

      <p onClick={() => setPage("dashboard")}>Dashboard</p>
      <p onClick={() => setPage("purchases")}>Purchases</p>
      <p onClick={() => setPage("transfers")}>Transfers</p>
      <p onClick={() => setPage("assignments")}>Assignments</p>
      <p onClick={() => setPage("logs")}>Logs</p>

      <hr />
      <p onClick={logout}>Logout</p>
    </div>
  );
}