export class UploadFile {
	constructor(
        private readonly userRepository: UserRepository,
        private readonly stringHasher: StringHasher,
        private readonly uuidManager: UUIDManager,
	) {}
}
