// import { useState } from "react";

// export default function ItemList() {
//   // Items start with availability = "available"
//   const [items, setItems] = useState([
//     { id: 1, availability: "available" },
//     { id: 2, availability: "available" },
//     { id: 3, availability: "available" },
//   ]);

//   // Toggle handler
//   const handleToggle = (id, checked) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, availability: checked ? "available" : "unavailable" }
//           : item
//       )
//     );
//   };

//   return (
//     <div>
//       {items.map((item) => (
//         <div key={item.id} style={{ marginBottom: "16px" }}>
//           <p>{item.availability}</p>

//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={item.availability === "available"} // ✅ default ON
//               onChange={(e) => handleToggle(item.id, e.target.checked)}
//             />
//             <span className="slider"></span>
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// }
