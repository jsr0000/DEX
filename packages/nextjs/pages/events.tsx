import type { NextPage } from "next";
import { formatEther } from "viem";
import { MetaHeader } from "~~/components/MetaHeader";
import { Spinner } from "~~/components/Spinner";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Events: NextPage = () => {
  const { data: EthToTokenEvents, isLoading: isEthToTokenEventsLoading } = useScaffoldEventHistory({
    contractName: "DEX",
    eventName: "EthToTokenSwap",
    fromBlock: 0n,
  });

  const { data: tokenToEthEvents, isLoading: isTokenToEthEventsLoading } = useScaffoldEventHistory({
    contractName: "DEX",
    eventName: "TokenToEthSwap",
    fromBlock: 0n,
  });

  const { data: liquidityProvidedEvents, isLoading: isLiquidityProvidedEventsLoading } = useScaffoldEventHistory({
    contractName: "DEX",
    eventName: "LiquidityProvided",
    fromBlock: 0n,
  });

  const { data: liquidityRemovedEvents, isLoading: isLiquidityRemovedEventsLoading } = useScaffoldEventHistory({
    contractName: "DEX",
    eventName: "LiquidityRemoved",
    fromBlock: 0n,
  });

  const { data: approveEvents, isLoading: isapproveEventsLoading } = useScaffoldEventHistory({
    contractName: "Balloons",
    eventName: "Approval",
    fromBlock: 0n,
  });


  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10" >
        {isapproveEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner width="75" height="75" />
          </div>
        ) : (
          <div style={{ marginBottom: '28px' }}>
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Approve Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Swapper</th>
                    <th className="bg-primary">Address</th>
                    <th className="bg-primary">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {!approveEvents || approveEvents.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    approveEvents?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.owner} />
                          </td>
                          <td>{(event.args.owner)}</td>
                          <td>{parseFloat(formatEther(event.args.value)).toFixed(4)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {isEthToTokenEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner width="75" height="75" />
          </div>
        ) : (
          <div>
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">ETH To Balloons Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Address</th>
                    <th className="bg-primary">Amount of ETH in</th>
                    <th className="bg-primary">Amount of Balloons out</th>
                  </tr>
                </thead>
                <tbody>
                  {!EthToTokenEvents || EthToTokenEvents.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    EthToTokenEvents?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.swapper} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.ethInput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.tokenOutput)).toFixed(4)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isTokenToEthEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner width="75" height="75" />
          </div>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Balloons To ETH Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Address</th>
                    <th className="bg-primary">Amount of Balloons In</th>
                    <th className="bg-primary">Amount of ETH Out</th>
                  </tr>
                </thead>
                <tbody>
                  {!tokenToEthEvents || tokenToEthEvents.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    tokenToEthEvents?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.swapper} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.tokensInput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.ethOutput)).toFixed(4)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isLiquidityProvidedEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner width="75" height="75" />
          </div>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Liquidity Provided Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Address</th>
                    <th className="bg-primary">Amount of ETH In</th>
                    <th className="bg-primary">Amount of Balloons In</th>
                    <th className="bg-primary">Lİquidity Minted</th>
                  </tr>
                </thead>
                <tbody>
                  {!liquidityProvidedEvents || liquidityProvidedEvents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    liquidityProvidedEvents?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.liquidityProvider} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.ethInput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.tokensInput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.liquidityMinted)).toFixed(4)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isLiquidityRemovedEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner width="75" height="75" />
          </div>
        ) : (
          <div className="mt-8 mb-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Liquidity Removed Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg mb-5">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Address</th>
                    <th className="bg-primary">Amount of ETH Out</th>
                    <th className="bg-primary">Amount of Balloons Out</th>
                    <th className="bg-primary">Liquidity Withdrawn</th>
                  </tr>
                </thead>
                <tbody>
                  {!liquidityRemovedEvents || liquidityRemovedEvents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    liquidityRemovedEvents?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.liquidityRemover} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.ethOutput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.tokensOutput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.liquidityWithdrawn)).toFixed(4)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Events;
