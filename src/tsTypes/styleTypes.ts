// styleTypes.ts
// Type definitioins for style


/**
 * CSS
 */

// height
export type CssHeight = 'h-5'
    | 'h-10'
    | 'h-15'
    | 'h-20'
    | 'h-25'
    | 'h-30'
    | 'h-35'
    | 'h-40'
    | 'h-45'
    | 'h-50'
    | 'h-55'
    | 'h-60'
    | 'h-65'
    | 'h-70'
    | 'h-75'
    | 'h-80'
    | 'h-85'
    | 'h-90'
    | 'h-95'
    | 'h-100';

// width
export type CssWidth = 'w-5'
    | 'w-15'
    | 'w-20'
    | 'w-25'
    | 'w-30'
    | 'w-35'
    | 'w-40'
    | 'w-45'
    | 'w-50'
    | 'w-55'
    | 'w-60'
    | 'w-65'
    | 'w-70'
    | 'w-75'
    | 'w-80'
    | 'w-85'
    | 'w-90'
    | 'w-95'
    | 'w-100';

/**
 * Bootstrap
 */


// reuse utilities
type BootstrapThemeColors = 'primary' // blue 
    | 'secondary'   // gray
    | 'success'     // green
    | 'info'        // sky
    | 'warning'     // yellow
    | 'danger'      // red
    | 'light'       // white
    | 'dark'        // black

type BootstrapPositions = 'top'  // top
    | 'end'        // right
    | 'bottom'     // bottom
    | 'start'      // left


// border
type BootstrapBorderDirection = 'border'
    | `border-${BootstrapPositions}`            /* positions */

type BootstrapBorderAddition = `border-${BootstrapThemeColors} border-${1 | 2 | 3 | 4 | 5}`

export type BootstrapBorder = {
    position: BootstrapBorderDirection;
    addition?: BootstrapBorderAddition;
}


/**
 * All im One
 */
export type CssStyle = {
    height?: CssHeight;
    width?: CssWidth;
    border?: BootstrapBorder;
};



