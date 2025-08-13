export default function Select({
    onChange,
    value,
    options = [
        {
            value: "",
            label: "",
        },
    ],
}) {
    return (
        <select
            name={options.value}
            onChange={onChange}
            value={value}
            className="w-full px-4 py-3 rounded-2xl border text-sm focus:ring-2 focus:ring-purple-300 outline-none text-black"
        >
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    className="text-sm text-center"
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}
