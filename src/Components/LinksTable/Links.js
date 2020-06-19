import React from "react";

const Links = ({ links, oncsclick }) => {
  return (
    <div>
      <table
        style={{
          borderCollapse: "separate",
          border: "3px solid white",
          margin: "0px auto",
        }}
      >
        <tbody>
          <tr className="text-center">
            <th
              style={{
                padding: "20px",
                fontSize: "20px",
                letterSpacing: "10px",
                color: "white",
              }}
            >
              PLAYLIST{" "}
              <button
                className="m-3"
                onClick={oncsclick}
                style={{
                  border: "1px solid white",
                  background: "transparent",
                  borderRadius: "50%",
                }}
              >
                <i
                  className="fa fa-play"
                  aria-hidden="true"
                  style={{ color: "white", padding: "10px" }}
                >
                  Play
                </i>
              </button>
            </th>
          </tr>
          {links.map((ele, i) => {
            return (
              <tr key={i}>
                <td style={{ color: "white", padding: "10px" }}>{ele}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Links;

// onClick={() => oncustomclick()}
