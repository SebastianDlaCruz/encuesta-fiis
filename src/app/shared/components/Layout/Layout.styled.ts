import { Colors } from "app/shared/utils/colors";
import styled from "styled-components";

const ButtonHeader = styled.button`
    background-color:${Colors.Close};
    padding: 10px 10px;
    border-radius: 10px;
    color:${Colors.White};
    font-weight: 600;
    cursor: pointer;
`;

const LayoutStyled ={
    ButtonHeader,
}

export default LayoutStyled;