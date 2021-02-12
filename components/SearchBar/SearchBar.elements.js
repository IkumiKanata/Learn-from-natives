import styled from "styled-components"

export const Form = styled.form`
     text-align: center;
    border-radius:4px;
    font: bold 16px sans-serif;
     max-width: 100%;
    position: relative;
    padding-bottom:15px;
`

export const Input = styled.input`
width: 60%;
box-sizing: border-box;
text-align:center;
border-bottom-left-radius: 6px;
border-top-left-radius: 6px;
background-color: offwhite;
box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
padding: 14px 15px 14px 40px;
border: 1px solid #b6c3cd;;
border-right: 0;
outline: none;
-webkit-appearance: none;
`

export const Button = styled.button`
border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    background-color:  #4b59f7;
    box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
    color: #ffffff;
    padding: 15px 22px;
    margin-left: -4px;
    cursor: pointer;
    border: none;
    outline: none;

    &:hover {
      background-color:#0467fb;
    }
`