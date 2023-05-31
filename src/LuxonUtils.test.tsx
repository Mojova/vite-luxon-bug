import LuxonUtils from "@date-io/luxon";
import {DateTime} from "luxon";

describe('LuxonUtils', () => {
    it('DateTime', () => {
        const utils = new LuxonUtils()
        const datetime = DateTime.now()
        expect(utils.date(datetime).isValid).toBeTruthy()
    });
})
