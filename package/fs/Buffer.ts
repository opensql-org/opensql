export default {
  toHex(buf: Buffer): string {
    return `0x${buf.toString('hex')}`;
  },
};
