import moment from 'moment';

import { NKConstant } from '../NKConstant';

type SupportedLanguages = (typeof NKConstant.SUPPORTED_LOCALES)[number];

const formatDate = (date?: string, locale: SupportedLanguages = NKConstant.FALLBACK_LOCALE) => {
    return moment(date).locale(locale).format('LL');
};

const formatFilter = (date: string | Date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const HKMoment = {
    formatDate,
    formatFilter,
};
