import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$background || 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'};
  color: ${props => props.$color || props.color || 'white'};
  padding: ${props => props.$padding || '10px 20px'};
  margin: ${props => props.$margin || '0'};
  border-radius: ${props => props.$radius || '8px'};
  font-size: ${props => props.$fontSize || '14px'};
  font-weight: ${props => props.$fontWeight || 600};
  box-shadow: ${props => props.$shadow || 'none'};
  opacity: ${props => (props.disabled ? 0.6 : 1)};

  &:hover {
    transform: ${props => (props.disabled ? 'none' : 'translateY(-2px)')};
    box-shadow: ${props => (props.disabled ? 'none' : props.$hoverShadow || '0 4px 8px rgba(52, 152, 219, 0.3)')};
  }
`;

const HelpContainer = styled.span`
  position: absolute;
  right: 4px;
  bottom: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const HelpBadge = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.$badgeColor || '#2c3e50'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  pointer-events: auto;
  cursor: help;
`;

const Tooltip = styled.div`
  position: absolute;
  top: 90%;
  right: 0;
  width: ${props => props.$width || '120px'};
  background: rgba(44, 62, 80, 0.95);
  color: #fff;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.4;
  white-space: normal;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 2;
  /* show only when the help badge is hovered */
  ${HelpContainer}:hover + & {
    opacity: 1;
  }
`;

function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  // styled-like props
  background,
  color,
  padding,
  margin,
  radius,
  fontSize,
  fontWeight,
  shadow,
  hoverShadow,
  style,
  className,
  // help tooltip props
  help = false,
  helpText = '',
  helpBadgeColor,
  tooltipWidth,
  ...rest
}) {
  return (
    <ButtonWrapper
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
      $background={background}
      $color={color}
      $padding={padding}
      $margin={margin}
      $radius={radius}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $shadow={shadow}
      $hoverShadow={hoverShadow}
      {...rest}
    >
      {children}
      {help && (
        <>
          <HelpContainer>
            <HelpBadge $badgeColor={helpBadgeColor}>?</HelpBadge>
          </HelpContainer>
          {helpText && (
            <Tooltip $width={tooltipWidth} style={{ pointerEvents: 'none' }}>
              {helpText}
            </Tooltip>
          )}
        </>
      )}
    </ButtonWrapper>
  );
}

export default Button;


