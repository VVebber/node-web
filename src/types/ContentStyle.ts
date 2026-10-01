export interface ContentStyle{
    type: 'text',
    style: string,
    value: string,
    enabled?: boolean,
    selection?: {
        contentId: string;
        anchor: number;
        focus: number;
    };
}