function withOpacityValue(variable: string): string | any {
    //RecursiveKeyValuePair<string, string> |
    return ({ opacityValue }: { opacityValue: any }) => {
        if (opacityValue === undefined) {
            return `rgb(var(${variable}))` as string;
        }
        return `rgb(var(${variable}) / ${opacityValue})` as string;
    };
}

function withVarValue(variable: string): string | any
//RecursiveKeyValuePair<string, string> |
{
    return `var(${variable});` as string;
}

export const backgroundImage = {
    'hero-pattern': withVarValue("--bg-hero-img")
}

export const themeColors = {
    canvas: withOpacityValue("--color-canvas-bg"),
    'bi-pink': withOpacityValue("--color-brand-pink"),
    'bi-lt-pink': withOpacityValue("--color-brand-lt-pink"),
    'bi-blue': withOpacityValue("--color-brand-blue"),
    'bi-teal': withOpacityValue("--color-brand-teal"),
    'bi-lt-teal': withOpacityValue("--color-brand-lt-teal"),
    'app-grey': withOpacityValue("--color-app-grey"),
    'app-grey-two': withOpacityValue("--color-app-grey-two"),
    'app-grey-twoPlus': withOpacityValue("--color-app-grey-two-plus"),
    'app-grey-three': withOpacityValue("--color-app-grey-three"),
    'app-grey-four': withOpacityValue("--color-app-grey-four"),
    'app-dark-navy': withOpacityValue("--color-app-dark-navy"),
    'app-medium-navy': withOpacityValue("--color-app-medium-navy"),
    'app-aqua': withOpacityValue("--color-app-aqua"),
    'app-aqua-700': withOpacityValue("--color-app-aqua-700"),
    'app-magenta': withOpacityValue("--color-app-magenta"),
    'app-red': withOpacityValue("--color-app-red"),
    'app-yellow': withOpacityValue("--color-app-yellow"),
    'app-lt-blue': withOpacityValue("--color-app-lt-blue"),
    'app-green': withOpacityValue("--color-app-green"),
    'app-paper': withOpacityValue("--color-app-paper"),
    'app-error': withOpacityValue("--color-app-error"),
    'app-pass': withOpacityValue("--color-app-pass"),
    'app-fail': withOpacityValue("--color-app-fail"),
    'app-default': withOpacityValue("--color-app-default"),
    'app-default-alt': withOpacityValue("--color-app-default-alt")
}
