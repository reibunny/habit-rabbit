export default function Input({ type, name, value, placeholder, onChange }) {
    return (
        <input
            autoComplete="false"
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-purple-300 outline-none text-black"
        />
    );
}
