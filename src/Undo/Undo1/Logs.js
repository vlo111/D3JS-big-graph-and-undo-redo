import React from "react";
import styled from "styled-components";

const StyledLog = styled.div`
  font-size: 0.8em;
  margin: 5px;
  border-bottom: 1px solid #eee;
`;

const Log = ({ val }) => <StyledLog>{JSON.stringify(val)}</StyledLog>;

const Logs = ({ title, items }) => (
    <div>
        <div>{title}</div>
        <div>
            {items.map((item, i) => (
                <Log key={i} val={item} />
            ))}
        </div>
    </div>
);

export default Logs;
