export interface NodemailerConfig {
  getNodemailerUser(): string;
  getNodemailerPassword(): string;
  getNodemailerFrom(): string;
}
