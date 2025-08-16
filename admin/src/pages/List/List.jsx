import React, { useEffect, useState } from "react";
import "./List.css";
import { url, currency } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import "./toggle.css";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`  ${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleToggle = (id, checked) => {
    setList((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, availability: checked ? "available" : "unavailable" }
          : item
      )
    );
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Availability</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          const isAvailable =
            item.availability === "available" || !item.availability;

          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>

              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked= {isAvailable} // ✅ toggle reflects availability
                    onChange={
                      (e) => handleToggle(item._id, e.target.checked) // ✅ update when switched
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
