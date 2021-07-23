

declare namespace QuickNav {

    interface QuickNavType {
        id?: number | string,
        name?: string
    }

    interface QuickNav extends Base.Page {
        id?: number | string | null,
        name?: string,
        icon?: string,
        href?: string,
        typeId?: number | null,
        navTypeId?: number,
        navTypeName?: string
    }
}