import React from "react";

type TypographyTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "div";

interface BaseTypographyProps {
  tag?: TypographyTag;
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  weight?:
    | "normal"
    | "bold"
    | "extrabold"
    | "thin"
    | "light"
    | "medium"
    | "semibold";
  color?: string;
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
}

interface LabelTypographyProps extends BaseTypographyProps {
  tag: "label";
  htmlFor: string;
}

type TypographyProps = BaseTypographyProps | LabelTypographyProps;

const defaultStyles: Record<TypographyTag, { size: string; weight: string }> = {
  h1: { size: "4xl", weight: "extrabold" },
  h2: { size: "3xl", weight: "semibold" },
  h3: { size: "2xl", weight: "medium" },
  h4: { size: "xl", weight: "medium" },
  h5: { size: "lg", weight: "normal" },
  h6: { size: "base", weight: "normal" },
  p: { size: "base", weight: "normal" },
  span: { size: "base", weight: "normal" },
  div: { size: "base", weight: "normal" },
  label: { size: "base", weight: "normal" },
};

const Typography: React.FC<TypographyProps> = ({
  tag = "p",
  size,
  weight,
  color = "text-black",
  className = "",
  children,
  htmlFor,
  ...props
}) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  const defaultSize = size || defaultStyles[tag].size;
  const defaultWeight = weight || defaultStyles[tag].weight;

  const baseStyles = `text-${defaultSize} font-${defaultWeight} ${color}`;

  const isLabel = tag === "label";

  return (
    <Tag
      className={`${baseStyles} ${className}`}
      {...(isLabel ? { htmlFor } : {})}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Typography;
