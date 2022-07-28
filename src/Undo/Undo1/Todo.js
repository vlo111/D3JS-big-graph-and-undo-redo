import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 5px 5px 0;
  color: #e91e63;
  margin-top: 30px;
`;

const Button = styled.button`
  transition: all 200ms ease-in;
  background-color: transparent;
  border: none;
  box-shadow: 0 0 1px 1px #909090;
  margin-right: 10px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 1px 1px #2196f3;
  }
`;

const Text = styled.div`
  transition: all 250ms ease-in-out;
  text-decoration: ${({ lineThrough }) =>
    lineThrough ? "line-through" : "none"};
  color: ${({ lineThrough }) => (lineThrough ? "#2196f3" : "inherit")};

  &:hover {
    cursor: pointer;
  }
`;

export default class Todo extends React.Component {
    onRemove = () => {
        const { onRemove, id } = this.props;
        onRemove(id);
    };

    onClick = () => {
        const { onMark, id } = this.props;
        onMark(id);
    };

    render() {
        const { value, done } = this.props;
        return (
            <Wrapper>
                <Button style={{ marginRight: "10px" }} onClick={this.onRemove}>
                    x
                </Button>
                <Text onClick={this.onClick} lineThrough={done}>
                    {value}
                </Text>
            </Wrapper>
        );
    }
}
