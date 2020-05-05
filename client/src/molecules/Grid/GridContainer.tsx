import React, {FunctionComponent} from "react";
import classes from "./Grid.module.scss";
import {AlignContent, AlignItem, FlexDirection, FlexWrap, JustifyContent} from "./GridTypes";

const DEFAULT_PROPS = {
    justifyContent: JustifyContent.FlexStart,
    className: "",
    alignItems: AlignItem.Initial,
    alignContent: AlignContent.Initial,
    flexWrap: FlexWrap.Wrap,
    flexDirection: FlexDirection.Row,
};

/**
 *
 * @param {function} onClick - onClick callback
 * @param {any} children - Child node within the GridContainer component
 * @param {string} justifyContent - Containers are based on flex-box, can use any valid justify-content value
 * @param {string} alignContent - Containers are based on flex-box, can use any valid align-content value
 * @param {string} flexWrap - Containers are based on flex-box, can use any valid flex-wrap value
 * @param {string} flexDirection - Containers are based on flex-box, can use any valid flex-direction value
 * @param {string} alignItems - Containers are based on flex-box, can use any valid align-items value
 * @param {string|number} padding - Container's padding value
 * @param {string} className - Custom Class that can be passed
 * @param {string} id - id to place on gridItem component
 * @returns {*}
 * @constructor
 */
interface GridContainerProps {
    onClick?: (event: React.MouseEvent<any>) => void,
    justifyContent?: JustifyContent,
    children: any,
    className?: string,
    alignItems?: AlignItem,
    id?: string,
    padding?: string,
    flexWrap?: FlexWrap,
    flexDirection?: FlexDirection,
    alignContent?: AlignContent,
};

const GridContainer: FunctionComponent<GridContainerProps> = ({
                           onClick,
                           justifyContent,
                           children,
                           className,
                           alignItems,
                           id,
                           padding,
                           flexWrap,
                           flexDirection,
                           alignContent,
                       }) => {

    const inlineStyle = {
        justifyContent,
        alignItems,
        padding,
        flexWrap,
        flexDirection,
        alignContent,
    };

    return (
        <div className={`${classes.flexGrid} ${className}`} style={inlineStyle} id={id} onClick={onClick}>
            {children}
        </div>
    );
};

GridContainer.defaultProps = {
    ...DEFAULT_PROPS,
};

export default GridContainer;
