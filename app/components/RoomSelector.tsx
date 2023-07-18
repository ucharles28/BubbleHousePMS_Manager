import styled from 'styled-components';

interface ButtonProps {
  variant: 'selected' | 'available' | 'booked';
}

const Button = styled.div<ButtonProps>`
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
      case 'selected':
        return `
          background-color: #32BAFF;
        `;
      case 'available':
        return `
          background-color: #6AD01F;
        `;
      case 'booked':
        return `
          background-color: #FF6166;
        `;
      default:
        return 'background-color: #6AD01F;';
    }
  }}
`;

export default Button;
