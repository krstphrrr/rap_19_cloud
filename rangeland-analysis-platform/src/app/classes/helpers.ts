// @dynamic
export class Helpers {
    public static range = (start, end) => Array.from(
        {length: (end - start)}, (v, k) => k + start)
    }
