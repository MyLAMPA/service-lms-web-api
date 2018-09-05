
export interface CheckboxProps {
    checked?: boolean
}

export function Checkbox(props: CheckboxProps = {}): string {
    const checked: boolean = !!props.checked

    return `
        <div style="display: inline-block; width: 4mm; height: 4mm; border: 1px solid rgba(51,51,51,.5); border-radius: 3px;"></div>
    `
}
