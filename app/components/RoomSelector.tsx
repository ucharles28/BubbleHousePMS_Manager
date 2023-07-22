import styled from 'styled-components';

interface ButtonProps {
  variant: number;
}

const Button = styled.button<ButtonProps>`
  display: inline-block;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  color: white;
  border-radius: 0.5rem;
  width: auto;
  height: auto;

  ${(props) => {
    switch (props.variant) {
      case 0:
        return `
          background-color: #6AD01F;
        `;
      case 1:
        return `
            background-color: #FF6166;
          `;
      case 2:
        return `
            background-color: #32BAFF;
        `;
      default:
        return 'background-color: #6AD01F;';
    }
  }}
`;

export default Button;
