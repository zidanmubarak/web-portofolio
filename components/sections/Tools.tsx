import { Section } from "@/components/ui/section";
import { stack, stackCategories } from "@/content/stack";
import { iconPaths } from "./tools/icons";
import { ToolCell } from "./tools/tool-cell";
import { ToolsReveal } from "./tools/tools-reveal";

/**
 * Tools — 05 (design-direction.md §4.7).
 *
 * A hairline inventory, not a card grid: one row per category, icon cells with
 * a label underneath. Data and icon paths stay on the server; only the pointer
 * variable and the reveal live on the client.
 */
export function Tools() {
  return (
    <Section
      id="tools"
      index="05"
      label="Tools"
      meta={`${stack.length} Items · ${stackCategories.length} Categories`}
      labelledBy="tools-heading"
    >
      <div className="u-grid items-end gap-y-6">
        <h2
          id="tools-heading"
          className="u-display col-span-4 max-w-[14ch] text-title lg:col-span-7"
        >
          What I work with.
        </h2>
        <p className="col-span-4 max-w-[42ch] text-small leading-relaxed text-ink-muted lg:col-span-4 lg:col-start-9">
          Tools that show up across these projects and the work behind them.
          Icons from simple-icons.
        </p>
      </div>

      <ToolsReveal>
        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:gap-12">
          {stackCategories.map((category) => {
            const items = stack.filter((item) => item.category === category.id);

            return (
              <div
                key={category.id}
                data-tools-group
                className="u-grid gap-y-4 border-t border-line pt-5"
              >
                <div className="col-span-4 lg:col-span-3">
                  <p className="u-label text-accent">{category.index}</p>
                  <h3 className="u-display mt-2 text-heading">
                    {category.label}
                  </h3>
                </div>

                <ul className="col-span-4 grid grid-cols-3 sm:grid-cols-4 lg:col-span-9 lg:grid-cols-6 xl:grid-cols-7">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="min-h-[84px] border-b border-line md:min-h-[92px]"
                    >
                      <ToolCell
                        name={item.name}
                        path={iconPaths[item.slug] ?? ""}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </ToolsReveal>
    </Section>
  );
}
