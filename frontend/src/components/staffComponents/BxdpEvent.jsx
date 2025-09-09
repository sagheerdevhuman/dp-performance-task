function BxdpEvent({event} ) {
  return (

    <tr
      key={event.id}
      className="cursor-pointer hover:text-tkh-grayscale-2 hover:bg-tkh-brand-purple-1 active:bg-tkh-brand-purple-2"
    >
      <td className="whitespace-nowrap h-8 pl-4 pr-3 text-sm font-light text-tkh-grayscale-10 sm:pl-6 md:pl-0">
        {approved}
      </td>
      <td className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
        {event.name}
      </td>
      <td className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
        {event.createdAt}
      </td>
      <td className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
        {event.organization.name}
      </td>
    </tr>
  );
}

export default BxdpEvent;
