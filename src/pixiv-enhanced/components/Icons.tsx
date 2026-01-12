import { styled, keyframes } from "../../shared";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledDownloadIcon = styled("svg")`
  width: 20px;
  height: 20px;
  fill: white;
`;

const StyledLoadingIcon = styled("svg")`
  width: 18px;
  height: 18px;
  animation: ${spin} 1s linear infinite;
  fill: none;
  stroke: white;
  stroke-width: 2;
`;

export const DownloadIcon = () => (
  <StyledDownloadIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </StyledDownloadIcon>
);

export const LoadingIcon = () => (
  <StyledLoadingIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
    <path d="M12 2 A10 10 0 0 1 22 12" stroke-linecap="round" />
  </StyledLoadingIcon>
);
