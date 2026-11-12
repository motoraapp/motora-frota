# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 17:16:07. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (8008 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- Gera o QR code do Pix a partir do copia e cola -->
24: <!-- Supabase (banco de dados online) -->
140: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
145: <!-- Header Principal -->
159: <!-- Controles do Header -->
161: <!-- Botão Status Online/Offline (Motorista) -->
169: <!-- Ativar Notificações -->
174: <!-- Temas -->
179: <!-- Logout Button -->
188: <!-- Conteúdo Principal -->
191: <!-- TELA DE LOGIN -->
192: #secLogin
225: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
226: #secDemoEscolha
241: <!-- PAINEL DO MOTORISTA -->
242: #secDriverPanel
244: <!-- Card do Veículo Vinculado -->
258: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
268: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
273: <!-- Aviso: nova versão do app Android -->
276: <!-- Aviso vermelho: notificações desligadas -->
279: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
283: <!-- Aviso de Pix / pagamento pendente -->
286: <!-- Navegação de Abas -->
304: <!-- Conteúdo das Abas Motorista -->
307: <!-- Aba CRLV-e -->
308: #tabDrvCrlv
313: <!-- Renderizado dinamicamente -->
317: <!-- Aba Contrato -->
318: #tabDrvContract
328: <!-- Renderizado dinamicamente -->
332: <!-- Aba Vistoria -->
333: #tabDrvInspection
340: <!-- Aba Pagamento -->
341: #tabDrvPayment
354: <!-- Caução e multas do motorista -->
356: <!-- Valor e descrição da cobrança -->
366: <!-- Seção Pix -->
380: <!-- QR Code Renderizado aqui -->
413: <!-- Seção Upload de Comprovante -->
430: <!-- Lista de comprovantes -->
435: <!-- Recibos quando o contrato está encerrado -->
442: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
443: #secMasterPanel
477: <!-- Aviso: falta criar a tabela dos termos no banco -->
480: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
482: <!-- Lista de Veículos -->
498: <!-- Renderizado via JS -->
505: <!-- Form de Adicionar Veículo -->
539: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
545: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
550: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
555: <!-- Fichas Arquivadas (após marcar caução pago) -->
564: <!-- Form de Adicionar Motorista -->
659: <!-- Barra de baixo do dono (só no design novo) -->
669: <!-- MODAL PRIMEIRO LOGIN -->
670: #modalFirstLogin
704: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
705: #modalNotif
718: <!-- MODAL VISTORIA (MASTER) -->
719: #modalInspection
732: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
733: #modalSettings
792: <!-- MODAL TEMAS -->
793: #modalThemes
804: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
805: #modalCreds
820: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
835: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
836: #modalDriverFile
876: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
905: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
920: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
962: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
963: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
964: #modalRecibo
983: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
984: #modalPixArea
1000: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1001: #modalIA
1083: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1084: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1085: #modalEditVeh
1104: #modalSenha
1126: #modalMeusRecibos
1144: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1145: #modalEmail
1165: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1166: #modalReport
1181: #modalFinance
1234: <!-- FILTROS -->
1283: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1303: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1304: #modalExpenses
1339: <!-- MODAL NOVO PIX -->
1340: #modalNewPix
1392: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1450: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1451: #modalCorrigirRecibo
1465: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1466: #modalDocViewer
1474: #modalDocBody
1475: <!-- Conteúdo pré-visualizado -->
1481: #modalTerms
1495: <!-- NOTIFICAÇÕES TOAST -->
1512: lsGet()
1513: lsSet()
1514: lsDel()
1537: demoLoginRole()
1541: demoId()
1542: demoSave()
1543: demoSaved()
1545: *datas no horário de Brasília*
1546: demoLocal()
1547: demoParts()
1548: demoDay()
1549: demoNextDue()
1554: *dados fictícios (4 meses)*
1555: demoBuild()
1698: *documentos fictícios (imagem gerada na hora)*
1699: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1700: demoDocBlob()
1778: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1779: demoQuery()
1802: out()
1808: run()
1849: demoOnUpdate()
1859: demoOnInsert()
1960: demoClient()
2025: demoStart()
2033: demoStop()
2039: abrirDemo()
2046: trocarDemo()
2051: demoBanner()
2066: toEmail()
2070: showLogin()
2074: esc()
2079: dataHoraBR()
2087: uiDialogo()
2135: uiConfirm()
2144: uiPrompt()
2150: friendlyError()
2160: devicePrefs()
2163: saveDevicePrefs()
2166: docRef()
2167: viewDocIdx()
2169: setBusy()
2207: **TEMAS**
2216: currentTheme()
2221: applyTheme()
2222: openThemes()
2232: pickTheme()
2238: toggleDarkMode()
2240: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2242: loadDesignCfg()
2249: applyDesign()
2266: markMasterNav()
2271: fillDesignCfg()
2276: saveDesign()
2290: showToast()
2299: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2300: senhaErro()
2301: abrirSenha()
2310: salvarIaCodigo()
2320: fecharSenha()
2321: salvarSenha()
2342: loginUserInput()
2347: loginErro()
2351: verSenha()
2356: handleLogin()
2405: logout()
2424: saveFirstLoginPreferences()
2447: carregarDados()
2470: aplicarDados()
2493: loadAndRender()
2520: autoRefresh()
2559: markUpdated()
2564: reload()
2569: renderApp()
2617: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2620: masterBack()
2622: viewAsDriver()
2644: exitViewAs()
2663: viewOnly()
2664: renderViewAsBanner()
2674: showSection()
2679: withBtn()
2687: toggleDriverStatus()
2696: isOnline()
2698: updateStatusToggleUI()
2711: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2720: checkApkUpdate()
2735: updateInstallApkButton()
2755: renderDriverPanel()
2980: switchDriverTab()
2995: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
2998: parsePixKey()
3002: normalizePixKey()
3010: pixKeyLooksOk()
3018: togglePixKeyFields()
3024: updatePixKeyPlaceholder()
3030: copyPixKey()
3037: copyPixCode()
3049: receiptBadge()
3059: receiptMasterBox()
3086: receiptAction()
3093: confirmReceipt()
3106: rejectReceipt()
3118: recheckReceipt()
3127: uploadReceipt()
3150: switchMasterTab()
3167: maskPhone()
3176: waLink()
3181: allVeh()
3182: allDrv()
3183: chargeVehicleId()
3195: enviarPedidoParcialAsaas()
3211: pedirPixParcial()
3229: restaurarPixTotal()
3235: responderPixParcial()
3259: contrato30Info()
3289: encerrarContrato()
3306: encerrarContratoPrompt()
3319: reativarContrato()
3343: marcarCaucaoPagoArquivar()
3364: desarquivarFicha()
3382: deliveryInspectionHtml()
3412: uploadDeliveryPhotos()
3439: delDeliveryPhoto()
3457: addCauDesconto()
3482: puxarMultaCaucao()
3503: delCauDesconto()
3525: dfCauDescontosHtml()
3558: dfContratoRender()
3602: encerrarContratoConfirmFicha()
3609: renderMasterPanel()
3752: renderArchivedDrivers()
3797: handleAddVehicle()
3830: deleteVehicle()
3831: cancelDeleteVehicle()
3833: confirmDeleteVehicle()
3857: abrirEditarVeiculo()
3876: fecharEditarVeiculo()
3877: salvarEditarVeiculo()
3907: drvCauMostra()
3914: drvCauLer()
3922: handleAddDriver()
4000: marcarSituacao()
4010: updateDriverPaymentStatus()
4019: deleteDriver()
4020: cancelDeleteDriver()
4022: confirmDeleteDriver()
4045: prepareFile()
4067: uploadFile()
4078: fileUrl()
4089: downloadName()
4093: renderFilePreview()
4113: renderPdfToCanvas()
4140: viewDoc()
4161: **DINHEIRO**
4162: parseMoney()
4169: fmtMoney()
4170: fmtDate()
4171: todayISO()
4173: **CONFIGURAÇÕES (Gemini e Google Drive)**
4175: loadConfigStatus()
4180: paintConfig()
4185: openSettings()
4195: closeSettings()
4196: saveConfig()
4206: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
4207: loadAsaasInfo()
4220: saveAsaas()
4228: testarAsaas()
4235: copiarAsaas()
4239: testDrive()
4246: resyncDrive()
4254: **FICHA DO MOTORISTA**
4257: openDriverFile()
4287: closeDriverFile()
4289: saveDriverFile()
4339: aiFillDriver()
4378: **CONTROLE FINANCEIRO**
4379: finRange()
4396: dayBR()
4397: inRange()
4399: onFinPeriodChange()
4405: fillFinFilters()
4413: clearFinFilters()
4417: updateFinFilterCount()
4426: openFinance()
4431: switchFinTab()
4441: closeFinance()
4443: renderFinance()
4521: renderFinGrafico()
4541: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
4543: okEmail()
4545: openEmailCompose()
4566: closeEmailCompose()
4567: sendEmailCompose()
4582: emailRecibo()
4587: emailIA()
4595: **RELATÓRIO DO FINANCEIRO**
4597: finFiltersText()
4602: finPeriodText()
4609: buildReportHtml()
4631: openFinReport()
4641: closeFinReport()
4642: printFinReport()
4646: shareFinReport()
4656: emailFinReport()
4662: **DESPESAS DO VEÍCULO**
4664: openExpenses()
4676: closeExpenses()
4677: fillExpenseTypes()
4682: createExpenseType()
4697: aiReadExpense()
4729: renderExpenses()
4751: saveExpense()
4778: deleteExpense()
4803: photoCard()
4832: inspectionHtml()
4858: hydrateImages()
4864: openInspection()
4872: closeInspection()
4876: renderInspectionModal()
4883: uploadInspection()
4914: deleteInspectionPhoto()
4934: fmtDue()
4940: nextDueLocal()
4951: openNewPix()
4981: **CAUÇÃO DO MOTORISTA**
4982: cauOf()
4983: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
4984: devOf()
4985: devCobrancas()
4987: devPrevisao()
4995: dfDevRender()
5022: dfDevIr()
5023: dfDevSalvar()
5028: dfDevAvisar()
5034: dfDevDesfazer()
5038: dfDevReceber()
5047: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
5051: cauPlano()
5059: cauParcela()
5066: cauParcelasTexto()
5070: cauNext()
5077: dfCauFill()
5087: dfCauCalc()
5115: dfCauRead()
5128: **CAUÇÃO: quanto já foi pago**
5130: cauStatus()
5140: obsResumoHtml()
5141: cauResumoHtml()
5146: **MULTAS E OUTRAS DESPESAS**
5147: multasOf()
5149: multaPagaAuto()
5154: multasAbertas()
5155: multasPendentes()
5156: multasResumoHtml()
5164: cobOf()
5165: dfCobFill()
5171: dfCobRead()
5174: dfCobInfo()
5184: cobResumoHtml()
5188: ajustesOf()
5192: ajusteVale()
5193: isoDia()
5195: vencProxima()
5196: previsaoProxima()
5210: previsaoHtml()
5214: dfAjRender()
5220: addAjuste()
5229: delAjuste()
5234: abrirAjustes()
5235: renderProxCobrancas()
5241: savePixExtra()
5249: dfMultFill()
5257: fdPaga()
5258: dfMultRender()
5267: toggleMultas()
5274: addMulta()
5284: delMulta()
5292: multaPaga()
5301: renderDriverExtras()
5329: mondayAfter()
5337: renderDriverProfileExtras()
5403: semanaDoPix()
5409: **MEUS RECIBOS (área do motorista)**
5411: meusRecibosLista()
5415: reciboRowHtml()
5423: renderEncerradoRecibos()
5428: openMeuReciboDireto()
5429: openMeusRecibos()
5436: closeMeusRecibos()
5437: reciboPdfHtml()
5448: verMeuRecibo()
5455: voltarMeusRecibos()
5456: pdfMeuRecibo()
5460: shareMeuRecibo()
5469: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
5470: editVehicleRent()
5487: nextParcel()
5493: fillNewPixValues()
5529: newPixParts()
5560: **PERÍODO E VENCIMENTO DA COBRANÇA**
5561: dataISO()
5562: dataDe()
5563: dataMais()
5564: dataBR()
5565: diasEntre()
5566: isoSP()
5567: pixPeriodo()
5574: pixDesc()
5575: pixDiasPeriodo()
5580: marcarAjustesPorVenc()
5585: pixDatasNovo()
5594: pixDatasMudou()
5605: pixAluguelProporcional()
5613: pixPeriodoInfo()
5626: pixAddLinha()
5633: pixLinhas()
5635: descSoma()
5645: calcNewPix()
5654: **RECIBO DE PAGAMENTO**
5658: receiptValue()
5659: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
5660: atrasoDados()
5667: cobrarAtraso()
5683: allocatePix()
5702: reciboData()
5725: fmtDateTimeBR()
5726: reciboTexto()
5777: openRecibo()
5794: closeRecibo()
5795: **CORRIGIR RECIBO**
5797: corrigirLinhaHtml()
5807: openCorrigirRecibo()
5830: closeCorrigirRecibo()
5831: corrigirLer()
5837: corrigirSoma()
5844: salvarCorrigirRecibo()
5861: copyRecibo()
5866: reciboCanvas()
5883: reciboPdfBlob()
5901: shareReciboPdf()
5917: rotularTabelas()
5935: areaAberta()
5936: markAreas()
5946: closeAreas()
5950: toggleArea()
5958: dobraSalva()
5959: setDobra()
5964: toggleDobra()
5971: dobraTopo()
5978: renderMasterResumo()
5992: renderMasterTopo()
6014: loadIA()
6036: updateIABadge()
6041: loadIASetting()
6047: paintIASwitch()
6053: toggleIA()
6060: loadRobo()
6069: iaPrepararQr()
6074: paintRobo()
6103: pedirCodigoRobo()
6112: toggleRobo()
6127: iaTodosGerar()
6145: iaTodosCancelar()
6149: iaTodosConfirmar()
6163: loadIARules()
6168: iaAbrirPdf()
6174: renderIARules()
6178: saveIARules()
6183: addIARule()
6188: delIARule()
6192: openIA()
6207: closeIA()
6208: iaShow()
6209: iaPhone()
6214: renderIA()
6256: iaAprovar()
6265: iaPhone2()
6266: iaSend()
6297: iaMark()
6308: iaDelete()
6319: openPixArea()
6328: closePixArea()
6329: renderPixArea()
6365: openEditPix()
6394: deletePix()
6406: closeNewPix()
6408: saveNewPix()
6499: pushSupported()
6500: isIOS()
6501: isStandalone()
6502: b64ToBytes()
6508: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
6513: notifStatus()
6521: stepsList()
6525: notifHelpHtml()
6559: renderNotifModal()
6571: checkDriverNotifications()
6604: activateFromModal()
6617: refreshNotifButton()
6636: subscribePush()
6651: enableNotifications()
6671: closeDocViewer()
6679: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
6691: allFeaturesOn()
6692: feat()
6693: loadDriverFeatures()
6700: saveDriverFeatures()
6704: drawFeatureToggles()
6719: setAllFeatures()
6730: applyDriverFeatures()
6745: **PIX: conferência do código e QR code desenhado no aparelho**
6746: crc16()
6754: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
6756: pixTxt()
6757: pixCampo()
6758: pixGerarCodigo()
6768: pixAutoLigado()
6769: pixAutoMudou()
6774: gerarPixAuto()
6790: pixRecebedorCarregar()
6801: pixRecebedorGuardar()
6808: pixValid()
6814: renderPixQr()
6824: previewNewPixQr()
6834: **FOTO DO MOTORISTA (recortada da CNH)**
6835: photoPath()
6836: fileToCanvas()
6855: cropPhoto()
6869: savePhoto()
6874: photoBoxFrom()
6880: fillAvatar()
6891: fillAvatars()
6904: storedFile()
6911: photoFromCnh()
6923: **FOTO DO PERFIL ACOMPANHA A CNH**
6926: cnhStamp()
6927: photoFiles()
6935: avatarPath()
6940: syncCnhPhotos()
6964: pickImage()
6967: changeDriverPhoto()
6983: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
6985: uploadTmp()
6992: clearTmp()
6997: aiReadFiles()
7003: okDateISO()
7005: noAccents()
7007: makeUsername()
7016: titleCase()
7017: syncNewDriverAccess()
7023: setNewDriverPhoto()
7028: pickNewDriverPhoto()
7032: resetNewDriverForm()
7040: newDriverDocChosen()
7074: anoCrlv()
7075: aiReadCrlv()
7092: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
7093: sendWelcomeEmail()
7099: showCredentials()
7110: demoAssistente()
7129: **PERGUNTAR À IA (ÁREA IA, só o master)**
7133: iaChatReset()
7134: iaNorm()
7135: iaAcha()
7141: iaVeicTxt()
7142: iaCamposVeic()
7143: iaDataOk()
7144: iaOpcoes()
7145: iaTodosMotoristas()
7149: iaFerramenta()
7238: renderIAChat()
7255: iaChatDica()
7256: iaChatEnviar()
7291: iaChatNota()
7292: iaCancelarCartao()
7293: iaConfirmarCartao()
7336: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
7337: renderAppEarnings()
7399: saveAppEarning()
7424: workDayISO()
7425: paintDayOff()
7434: renderDayOff()
7441: setDayOff()
7451: aiReadEarning()
7484: **DESPESAS DO APLICATIVO**
7486: appExpCustomTypes()
7487: fillAppExpTypes()
7494: onAppExpTypeChange()
7499: saveAppExpense()
7523: deleteAppExpense()
7532: deleteAppEarning()
7629: loadTermsAcceptances()
7641: termsOf()
7642: currentAcceptance()
7643: needsTermsAcceptance()
7646: fmtDateTime()
7649: termsPlainText()
7653: termsHash()
7661: openTermsGate()
7684: termsGateCheck()
7692: acceptTerms()
7712: acceptanceHtml()
7723: openTermsViewer()
7741: closeTerms()
7747: downloadTermsCopy()
7768: termsBadgeMaster()
7775: termsMasterDetail()
7816: renderTermsSetupBanner()
7829: copyTermsSql()
7839: cnhExpired()
7840: cnhWaiting()
7841: onlyDigits()
7842: normName()
7844: verifyCnh()
7856: renderCnhBanner()
7874: sendNewCnh()
7922: cnhBadgeMaster()
7930: applyPendingCnh()
7938: autoReadNewCnhs()
7956: cnhPendingHtml()
7970: recheckPendingCnh()
7980: rejectPendingCnh()
7990: showContractDoc()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (518 linhas)

22: serviceKey()
29: json()
31: brl()
34: secret()
39: asaas()
52: avisar()
62: hojeBR()
63: proximoDia()
70: proximaParcela()
81: cauParcela()
90: ajusteVale()
93: tirarAjustes()
99: cobrarMotorista()
112: *valores (mesma regra do Novo Pix)*
140: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
143: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
164: r2()
166: criarQrAsaasEUpload()
189: saldoAbertoMotorista()
228: salvarQrParcialNoPerfil()
239: cobrarTodos()
259: *pagamento recebido*
260: quemPagou()
283: pagamentoRecebido()
349: usuarioAuth()
358: ehMaster()
363: pixParcialMotorista()
422: autorizarParcial()
463: preparar()
464: limpa()
499: acao "pix_parcial"
502: acao "autorizar_parcial"
507: acao "preparar"
511: acao "cobrar"

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (310 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
122: emAberto()
134: avisoAtraso()
152: **4) PIX AUTOMÁTICO DO MOTORA**
154: crc16()
159: campo()
160: txtPix()
161: codigoPix()
168: chaveNormal()
175: proximaParcela()
183: pixAutomatico()
190: *valores (mesma regra do Novo Pix e do Asaas)*
217: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
238: pixAutoTodos()
262: enviar()
271: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (442 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
