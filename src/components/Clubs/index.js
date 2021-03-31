import React, { useState, useEffect } from "react";
import colors from "../../constants/RTCColors";
import Heading from "../General/Heading";
import ViewWithTopBorder from "../General/ViewWithTopBorder";
import Avatar from "react-avatar";
function Clubs() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "65%",
          marginRight: "50px",
          marginLeft: "40px",
          marginTop: "50px",
        }}
      >
        <ViewWithTopBorder color={colors.limeGreen}>
          <section
            style={{
              marginBottom: "30px",
            }}
          >
            <Avatar round={true} size="176px" />
            <button
              classname="button is-link"
              type="button"
              style={{
                marginLeft: "800px",
                backgroundColor: "#00AEEF",
                borderRadius: "15px",
                width: "150px",
                height: "50px",
                fontFamily: "Roboto",
                fontStyle: "normal",
                color: "white",
                fontSize: "18px",
                lineHeight: "21px",
                alignItems: "center",
                letterSpacing: "0.07em",
              }}
            >
              Edit Profile
            </button>
          </section>
          <section>
            <Heading
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "34px",
                lineHeight: "40px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
              }}
            >
              Club name
            </Heading>
          </section>
          <section>Club description</section>
        </ViewWithTopBorder>
      </div>

      <div
        style={{
          width: "25%",
          marginLeft: "50px",
          marginRight: "40px",
          marginTop: "50px",
        }}
      >
        <ViewWithTopBorder color={colors.green}>
          <section>
            <Heading
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "21px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.05em",
              }}
            >
              Upcoming Events
            </Heading>
          </section>
          <section
            style={{
              backgroundColor: "white",
              width: "80%",
              height: "250px",
              margin: "40px",
            }}
          >
            <Heading
              style={{
                padding: "15px",
                textAlign: "center",
              }}
            >
              Event1
            </Heading>
          </section>
          <section
            style={{
              backgroundColor: "white",
              width: "80%",
              height: "250px",
              margin: "40px",
            }}
          >
            <Heading
              style={{
                padding: "15px",
                textAlign: "center",
              }}
            >
              Event2
            </Heading>
          </section>
        </ViewWithTopBorder>
      </div>
    </div>
  );
}
export default Clubs;
