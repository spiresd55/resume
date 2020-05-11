import React, {FunctionComponent} from "react";
import classes from "./Grid.module.scss";
import {AlignSelf, GridWidth} from "./GridTypes";

const DEFAULT_PROPS = {
    className: "",
    xs: (12 as GridWidth),
    order: 0,
    alignSelf: AlignSelf.Auto,
};

/**
 * This function goes through the breakpoint array, if it finds a container with a 0 width,
 * it will automatically set that breakpoint width to the previous breakpoint's width
 * eg) xs: 12, sm: 10, md: 0, lg: 0, xl: 0 will become xs: 12, sm: 10, md: 10, lg: 10, xl: 10
 * @param {number} xs - grid width at extra small breakpoint (1-12)
 * @param {number} sm - grid width at small breakpoint (1-12)
 * @param {number} md - grid width at medium breakpoint (1-12)
 * @param {number} lg - grid width at large breakpoint (1-12)
 * @param {number} xl - grid width at extra large breakpoint (1-12)
 * @returns {*}
 */
const generateGridClasses = (xs: GridWidth, sm: GridWidth, md: GridWidth, lg: GridWidth, xl: GridWidth) => {
    const breakpoints = [
        { breakpoint: "xs", val: xs },
        { breakpoint: "sm", val: sm },
        { breakpoint: "md", val: md },
        { breakpoint: "lg", val: lg },
        { breakpoint: "xl", val: xl },
    ];

    const gridItemClasses = breakpoints.reduce((accumulator: string[], current, index, array) => {
        if (index === 0) {
            const prop = `col-xs-${current.val}`;
            accumulator.push(classes[prop]);
        } else if (current.val === undefined) {
            const size = array[index - 1].val;
            const { breakpoint } = current;
            array[index] = { breakpoint, val: size };
            const prop = `col-${current.breakpoint}-${size}`;
            accumulator.push(classes[prop]);
        } else {
            const prop = `col-${current.breakpoint}-${current.val}`;
            accumulator.push(classes[prop]);
        }
        return accumulator;
    }, []);

    return gridItemClasses.join(" ");
};

//TODO: Automatic assignment
/**
 *
 * @param {number} offsetXs - grid offset at extra small breakpoint (1-12)
 * @param {number} offsetSm - grid offset at small breakpoint (1-12)
 * @param {number} offsetMd - grid offset at medium breakpoint (1-12)
 * @param {number} offsetLg - grid offset at large breakpoint (1-12)
 * @param {number} offsetXl - grid offset at extra large breakpoint (1-12)
 * @returns {*}
 * @constructor
 */
const generateOffsetClasses = (
    offsetXs: GridWidth,
    offsetSm: GridWidth,
    offsetMd: GridWidth,
    offsetLg: GridWidth,
    offsetXl: GridWidth
) => {
    const breakpoints = [
        { breakpoint: "xs", val: offsetXs },
        { breakpoint: "sm", val: offsetSm },
        { breakpoint: "md", val: offsetMd },
        { breakpoint: "lg", val: offsetLg },
        { breakpoint: "xl", val: offsetXl },
    ];

    const gridOffsetClasses = breakpoints.reduce((accumulator: string[], current, index, array) => {
        if (current.val !== undefined) {
            const prop = `col-offset-${current.breakpoint}-${current.val}`;
            accumulator.push(classes[prop]);
        } else if (index !== 0 && current.val === undefined) {
            const prev = array[index - 1];
            if (prev.val) {
                const { breakpoint } = current;
                array[index] = { breakpoint, val: prev.val };
                const prop = `col-offset-${current.breakpoint}-${prev.val}`;
                accumulator.push(classes[prop]);
            }
        }
        return accumulator;
    }, []);

    return gridOffsetClasses.join(" ");
};

/**
 *
 * @param children {any} - Child node within the Grid component
 * @param className {string} - Classname to pass on the GridItem div
 * @param alignSelf {string} - based on flexbox's align self prop
 * @param {number} xs - grid width at extra small breakpoint (1-12)
 * @param {number} sm - grid width at small breakpoint (1-12)
 * @param {number} md - grid width at medium breakpoint (1-12)
 * @param {number} lg - grid width at large breakpoint (1-12)
 * @param {number} xl - grid width at extra large breakpoint (1-12)
 * @param {number} id - id to place on gridItem component
 * @param {number} order- order in which the grid item displays amongst other gridItems
 * @param {number} offsetXs - grid offset at extra small breakpoint (1-12)
 * @param {number} offsetSm - grid offset at small breakpoint (1-12)
 * @param {number} offsetMd - grid offset at medium breakpoint (1-12)
 * @param {number} offsetLg - grid offset at large breakpoint (1-12)
 * @param {number} offsetXl - grid offset at extra large breakpoint (1-12)
 * @param {number} flexGrow - flexbox flexGrow property
 * @param {func} onClick - on click callback for grid item tag
 * @returns {*}
 * @constructor
 */
interface GridItemProps {
    xs?: GridWidth,
    sm?: GridWidth,
    md?: GridWidth,
    lg?: GridWidth,
    xl?: GridWidth,
    offsetXs?: GridWidth,
    offsetSm?: GridWidth,
    offsetMd?: GridWidth,
    offsetLg?: GridWidth,
    offsetXl?: GridWidth,
    children: any,
    className?: string,
    id?: string,
    order?: number,
    alignSelf?: AlignSelf,
    onClick?: (event: React.MouseEvent<any>) => void,
    flexGrow?: number,
}

const GridItem: FunctionComponent<GridItemProps> = ({
                      xs,
                      sm,
                      md,
                      lg,
                      xl,
                      offsetXs,
                      offsetSm,
                      offsetMd,
                      offsetLg,
                      offsetXl,
                      children,
                      className,
                      id,
                      order,
                      alignSelf,
                      onClick,
                      flexGrow,
                  }) => {
    const breakpointClasses = generateGridClasses(xs, sm, md, lg, xl);
    const offsetClasses = generateOffsetClasses(offsetXs, offsetSm, offsetMd, offsetLg, offsetXl);

    const inlineStyle: any = {
        order,
        alignSelf,
    };

    if (flexGrow) {
        inlineStyle.flexGrow = flexGrow;
    }
    console.log("Grid Item", xs);
    console.log(inlineStyle, offsetClasses, breakpointClasses);

    return (
        <div
            className={`${offsetClasses} ${breakpointClasses} ${className}`.trim()}
            id={id}
            style={inlineStyle}
            onClick={onClick}
        >
            {children}
        </div>
);
};

GridItem.defaultProps = {
    ...DEFAULT_PROPS,
};

export default GridItem;
