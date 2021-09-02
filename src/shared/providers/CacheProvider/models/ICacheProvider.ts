interface ICacheProvider {
	save(key: string, value: string): Promise<void>;
	invalidate(key: string): Promise<void>;
	recover<T>(key: string): Promise<T | null>;
	invalidateWhitPrefix(prefix: string): Promise<void>;
}

export default ICacheProvider;
