import React, { useState } from 'react';
import {
  TopAppBar, SearchBar, BasicComponent, Card, SmallTitle, Snackbar,
  OverlayIconDropdownMenu, OverlayIconCascadingDropdownMenu,
  TuneIcon, SortIcon, SelectAllIcon
} from '@miuix/react';
import {
  BasicComponentSection, CheckboxSection, RadioButtonSection,
  SwitchSection, ArrowSection, DialogSection, BottomSheetSection,
  DropdownSection, SpinnerSection, ButtonSection, ProgressSection,
  TextFieldSection, SliderSection, TabRowSection, NumberPickerSection,
  ColorPickerSection, BlurSection, CardSection, OthersSection
} from './components/MainPageSections';

// ─── TopAppBar actions (Replicated 1:1 with upgraded cascading APIs) ──────────
const TopBarActions: React.FC = () => {
  const [cascadeSortIdx, setCascadeSortIdx] = useState(0);
  const [cascadeViewIdx, setCascadeViewIdx] = useState(0);
  const [cascadeFilterIdx, setCascadeFilterIdx] = useState(0);

  const [s1, setS1] = useState(0);
  const [s2, setS2] = useState(1);
  const [s3, setS3] = useState(2);

  const [sel, setSel] = useState(new Set(['Multi selection A-1', 'Multi selection B-2', 'Multi selection B-3']));

  const toggle = (t: string) => {
    setSel(p => {
      const n = new Set(p);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });
  };

  const cascadingEntries = [
    {
      items: [
        { text: 'Sort by capture date', selected: cascadeSortIdx === 0, onClick: () => setCascadeSortIdx(0) },
        { text: 'Sort by date added', selected: cascadeSortIdx === 1, onClick: () => setCascadeSortIdx(1) },
      ],
    },
    {
      items: [
        {
          text: 'View mode',
          children: [
            { text: 'Group by date', selected: cascadeViewIdx === 0, onClick: () => setCascadeViewIdx(0) },
            { text: 'Compact', selected: cascadeViewIdx === 1, onClick: () => setCascadeViewIdx(1) },
          ],
        },
        {
          text: 'Filter',
          children: [
            { text: 'All items', selected: cascadeFilterIdx === 0, onClick: () => setCascadeFilterIdx(0) },
            { text: 'Camera album', selected: cascadeFilterIdx === 1, onClick: () => setCascadeFilterIdx(1) },
          ],
        },
      ],
    },
  ];

  const optionEntries = [
    {
      items: [
        { text: 'Selection A-1', selected: s1 === 0, onClick: () => setS1(0) },
        { text: 'Selection A-2', selected: s1 === 1, onClick: () => setS1(1) },
      ],
    },
    {
      items: [
        { text: 'Selection B-1', selected: s2 === 0, onClick: () => setS2(0) },
        { text: 'Selection B-2', selected: s2 === 1, onClick: () => setS2(1) },
        { text: 'Selection B-3', selected: s2 === 2, onClick: () => setS2(2) },
      ],
    },
    {
      items: [
        { text: 'Selection C-1', selected: s3 === 0, onClick: () => setS3(0) },
        { text: 'Selection C-2', selected: s3 === 1, onClick: () => setS3(1) },
        { text: 'Selection C-3', selected: s3 === 2, onClick: () => setS3(2) },
        { text: 'Selection C-4', selected: s3 === 3, onClick: () => setS3(3) },
      ],
    },
  ];

  const multiSelectEntries = [
    {
      items: [
        { text: 'Multi selection A-1', selected: sel.has('Multi selection A-1'), onClick: () => toggle('Multi selection A-1') },
        { text: 'Multi selection A-2', selected: sel.has('Multi selection A-2'), onClick: () => toggle('Multi selection A-2') },
      ],
    },
    {
      items: [
        { text: 'Multi selection B-1', selected: sel.has('Multi selection B-1'), onClick: () => toggle('Multi selection B-1') },
        { text: 'Multi selection B-2', selected: sel.has('Multi selection B-2'), onClick: () => toggle('Multi selection B-2') },
        { text: 'Multi selection B-3', selected: sel.has('Multi selection B-3'), onClick: () => toggle('Multi selection B-3') },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <OverlayIconCascadingDropdownMenu entries={cascadingEntries} collapseOnSelection={true}>
        <div className="miuix-action-icon-button">
          <TuneIcon style={{ width: 24, height: 24 }} />
        </div>
      </OverlayIconCascadingDropdownMenu>

      <OverlayIconDropdownMenu entries={optionEntries} collapseOnSelection={false}>
        <div className="miuix-action-icon-button">
          <SortIcon style={{ width: 24, height: 24 }} />
        </div>
      </OverlayIconDropdownMenu>

      <OverlayIconDropdownMenu entries={multiSelectEntries} collapseOnSelection={false}>
        <div className="miuix-action-icon-button">
          <SelectAllIcon style={{ width: 24, height: 24 }} />
        </div>
      </OverlayIconDropdownMenu>
    </div>
  );
};

function useIsWideScreen() {
  const [isWide, setIsWide] = useState(window.innerWidth > window.innerHeight);
  React.useEffect(() => {
    const handler = () => setIsWide(window.innerWidth > window.innerHeight);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isWide;
}

// ─── MainPage ─────────────────────────────────────────────────────────────────
export const MainPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const notExpanded = !expanded;
  const isWide = useIsWideScreen();

  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar title="Home" largeTitle={isWide ? undefined : 'Home'} actions={<TopBarActions />} />
      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column' }}>
        <SmallTitle text="SearchBar" />
        <SearchBar
          value={searchValue}
          onValueChange={setSearchValue}
          placeholder="Search"
          expanded={expanded}
          onExpandedChange={setExpanded}
          onSearch={() => setExpanded(false)}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[0, 1, 2, 3].map(i => (
              <BasicComponent
                key={i}
                title={`Suggestion ${i}`}
                onClick={() => {
                  setSearchValue(`Suggestion ${i}`);
                  setExpanded(false);
                }}
              />
            ))}
          </div>
        </SearchBar>

        {notExpanded && (
          <>
            <BasicComponentSection />
            <CheckboxSection />
            <RadioButtonSection />
            <SwitchSection />
            <ArrowSection />
            <DialogSection />
            <BottomSheetSection />
            <DropdownSection />
            <SpinnerSection />
            <ButtonSection />
            <div style={{ marginTop: 12 }}>
              <SmallTitle text="Snackbar" />
            </div>
            <Card>
              <BasicComponent title="Show Snackbar" onClick={() => setSnackbarVisible(true)} />
            </Card>
            <ProgressSection />
            <TextFieldSection />
            <SliderSection />
            <TabRowSection />
            <NumberPickerSection />
            <ColorPickerSection />
            <BlurSection />
            <CardSection />
            <OthersSection />
            <div style={{ height: 12 }} />
          </>
        )}
      </div>
      <Snackbar
        visible={snackbarVisible}
        message="Hello from Miuix Snackbar!"
        actionLabel="UNDO"
        onActionClick={() => setSnackbarVisible(false)}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </div>
  );
};
