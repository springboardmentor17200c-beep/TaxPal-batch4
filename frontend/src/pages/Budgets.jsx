// import { useEffect, useState } from "react";
// import apiClient from "../api/apiClient";
// import BudgetForm from "../components/budget/BudgetForm";

// export default function Budgets() {
//   const [budgets, setBudgets] = useState([]);
//   const [editingBudget, setEditingBudget] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 1. Fetch Budgets - Uses your auth utility via apiClient
//   const fetchBudgets = async () => {
//     try {
//       setLoading(true);
//       const res = await apiClient.get("/budgets");
//       // Assuming your backend returns { data: [...] }
//       setBudgets(res.data.data || res.data || []);
//     } catch (err) {
//       console.error("Fetch failed:", err.response?.data?.message || "Unauthorized");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBudgets();
//   }, []);

//   // 2. Delete Logic - Appends ID to URL to avoid "Route Not Found"
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this budget?")) {
//       try {
//         await apiClient.delete(`/budgets/${id}`);
//         setBudgets(budgets.filter((b) => b._id !== id));
//       } catch (err) {
//         alert("Delete failed: " + (err.response?.data?.message || "Route Not Found"));
//       }
//     }
//   };

//   // 3. Helper to trigger Edit mode
//   const handleEditClick = (budget) => {
//     setEditingBudget(budget);
//     // Scroll to form for better UX
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
//       {/* Header with Health Status - Milestone 2 */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
//         <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>Budgets</h1>
//         <div style={{ 
//           background: "#fff", 
//           padding: "10px 20px", 
//           borderRadius: "8px", 
//           border: "1px solid #e5e7eb",
//           boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
//         }}>
//           <span style={{ color: "#6b7280", fontSize: "14px" }}>Budget Health: </span>
//           <span style={{ color: "#10b981", fontWeight: "bold" }}>Good</span>
//         </div>
//       </div>

//       {/* Form Section */}
//       <BudgetForm 
//         onBudgetAdded={(newB) => setBudgets([...budgets, newB])}
//         onBudgetUpdated={(updB) => {
//           setBudgets(budgets.map((b) => (b._id === updB._id ? updB : b)));
//           setEditingBudget(null);
//         }}
//         editData={editingBudget}
//         clearEdit={() => setEditingBudget(null)}
//       />

//       {/* Budget Table Section */}
//       <div style={{ 
//         marginTop: "32px", 
//         background: "#fff", 
//         borderRadius: "12px", 
//         border: "1px solid #e5e7eb", 
//         overflow: "hidden" 
//       }}>
//         <table width="100%" style={{ borderCollapse: "collapse" }}>
//           <thead style={{ background: "#f9fafb", color: "#6b7280", fontSize: "12px", textTransform: "uppercase" }}>
//             <tr>
//               <th align="left" style={{ padding: "16px" }}>Category</th>
//               <th align="left" style={{ padding: "16px" }}>Budget Limit</th>
//               <th align="left" style={{ padding: "16px" }}>Month</th>
//               <th align="left" style={{ padding: "16px" }}>Status</th>
//               <th align="right" style={{ padding: "16px" }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>Loading budgets...</td></tr>
//             ) : budgets.length === 0 ? (
//               <tr><td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>No budgets found.</td></tr>
//             ) : (
//               budgets.map((b) => (
//                 <tr key={b._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
//                   <td style={{ padding: "16px", fontWeight: "600", color: "#111827" }}>{b.category}</td>
//                   <td style={{ padding: "16px" }}>₹{b.limit?.toLocaleString()}</td>
//                   <td style={{ padding: "16px" }}>{b.month}</td>
//                   <td style={{ padding: "16px" }}>
//                     <span style={{ 
//                       background: "#ecfdf5", 
//                       color: "#059669", 
//                       padding: "4px 12px", 
//                       borderRadius: "20px", 
//                       fontSize: "12px", 
//                       fontWeight: "600" 
//                     }}>
//                       On Track
//                     </span>
//                   </td>
//                   <td align="right" style={{ padding: "16px" }}>
//                     {/* Standard Text Links instead of Icons */}
//                     <button 
//                       onClick={() => handleEditClick(b)}
//                       style={{ 
//                         background: "none", 
//                         border: "none", 
//                         color: "#2563eb", 
//                         fontWeight: "600", 
//                         cursor: "pointer", 
//                         marginRight: "15px",
//                         fontSize: "14px"
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(b._id)}
//                       style={{ 
//                         background: "none", 
//                         border: "none", 
//                         color: "#dc2626", 
//                         fontWeight: "600", 
//                         cursor: "pointer",
//                         fontSize: "14px"
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import BudgetForm from "../components/budget/BudgetForm";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBudget, setEditingBudget] = useState(null);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      // Fetch budgets which should include 'spent' or 'totalExpenses' from backend
      const res = await apiClient.get("/budgets");
      setBudgets(res.data.data || []);
    } catch (err) {
      console.error("Fetch failed:", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        await apiClient.delete(`/budgets/${id}`);
        setBudgets(budgets.filter((b) => b._id !== id));
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  // Logic to determine status badge style and text
  const getStatusInfo = (limit, spent = 0) => {
    if (spent > limit) {
      return { 
        label: "Over Budget", 
        color: "#dc2626", 
        bg: "#fef2f2" 
      };
    }
    return { 
      label: "On Track", 
      color: "#059669", 
      bg: "#ecfdf5" 
    };
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Budgets</h1>
        <div style={{ background: "#fff", padding: "10px 20px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          Budget Health: <span style={{ color: "#10b981", fontWeight: "bold" }}>Good</span>
        </div>
      </div>

      <BudgetForm 
        onBudgetAdded={(newB) => setBudgets([...budgets, newB])}
        onBudgetUpdated={(updB) => {
          setBudgets(budgets.map((b) => (b._id === updB._id ? updB : b)));
          setEditingBudget(null);
        }}
        editData={editingBudget}
        clearEdit={() => setEditingBudget(null)}
      />

      <div style={{ marginTop: "32px", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table width="100%" style={{ borderCollapse: "collapse" }}>
          <thead style={{ background: "#f9fafb", color: "#6b7280", fontSize: "12px" }}>
            <tr>
              <th align="left" style={{ padding: "16px" }}>CATEGORY</th>
              <th align="left" style={{ padding: "16px" }}>LIMIT</th>
              <th align="left" style={{ padding: "16px" }}>SPENT</th>
              <th align="left" style={{ padding: "16px" }}>STATUS</th>
              <th align="right" style={{ padding: "16px" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((b) => {
              // Calculate status based on current budget data
              const status = getStatusInfo(b.limit, b.spent || 0);
              
              return (
                <tr key={b._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "16px", fontWeight: "600" }}>{b.category}</td>
                  <td style={{ padding: "16px" }}>₹{b.limit}</td>
                  <td style={{ padding: "16px" }}>₹{b.spent || 0}</td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ 
                      background: status.bg, 
                      color: status.color, 
                      padding: "4px 12px", 
                      borderRadius: "20px", 
                      fontSize: "12px", 
                      fontWeight: "600" 
                    }}>
                      {status.label}
                    </span>
                  </td>
                  <td align="right" style={{ padding: "16px" }}>
                    <button 
                      onClick={() => setEditingBudget(b)}
                      style={{ color: "#2563eb", background: "none", border: "none", cursor: "pointer", marginRight: "15px", fontWeight: "bold" }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(b._id)}
                      style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}