import React from "react";
import { FaBuilding } from "react-icons/fa";
import "./Styles/styles.css";
import { IoInformation } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

const CustomNodeContent = (props) => {

  console.log("->", props);

  
  var type = props.data.type
  if (props.data.type === "domain"){
    var node = "node-container-domain"
  }
  if (props.data.type === "issuer"){
    var node = "node-container-issuer"
  }
  if (props.data.type === "class"){
    var node = "node-container-class"
  }
  if (props.data.type === "badge"){
    var node = "node-container-badge"
  }

  return (
    <>
      <div className={node}>
        <div className="node-details">
          
          {props.data.team === "" ? (
            <div className="node-content">
              <img
                className="node-img"
                src={props.data.imageUrl}
                alt="Profile"
              />
              <div className="node-info">
                <div className="node-name">{props.data.name}</div>
                <div className="node-role">{props.data.positionName}</div>
                {/* {props.data.department && (
                  <div className="node-department">
                    <FaBuilding />
                    <div>{props.data.department}</div>
                  </div>
                )} */}
                <div>
                {/* <div>
                  <button className="diagram-card-plus-btn" onClick={props.handleShowAdd}>
              <FaPlus />
              </button>
                </div>   */}
                <button className="diagram-card-info-btn" onClick={props.handleShow}>
                  <IoInformation />
                </button>  
                </div>
              </div>
            </div>
          ) : (
            <div className="node-team">
              <div className="node-team-name">{props.data.team}</div>
              {props._children !== null &&
                props._children
                  .slice(0, 4)
                  .map((child) => (
                    <img
                      key={child.data.id}
                      className="node-team-member-img"
                      src={child.data.imageUrl}
                      alt="team member"
                    />
                  ))}
                 <div>
                {/* <button className="diagram-card-info-btn" onClick={console.log(props)}>
                  <IoInformation/>
                </button> */}
                </div>  
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomNodeContent;
